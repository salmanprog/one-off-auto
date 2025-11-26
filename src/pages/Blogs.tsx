import { useState, useMemo, useEffect } from "react";
import MainLayout from "../components/layouts/MainLayout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { useFetch } from "../hooks/request";

interface Blog {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    author: string;
    category: string;
    slug: string;
}

const Blogs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // BLOG STATE (API Data)
    const [blogs, setBlogs] = useState<Blog[]>([]);

    // Fetch API
    const { data, loading } = useFetch("blog_list", "mount", "?limit=5000");
    // Load API data into blogs[]
    useEffect(() => {
        if (data && Array.isArray(data)) {
            const formatted = data.map((item: any) => ({
                id: String(item.id),
                title: item.title,
                excerpt: item.description ?? '',
                image: item.image_url,
                date: item.created_at,
                author: item.category?.title || "Admin",
                category: item.category?.title || "General",
                slug: item.slug,
            }));

            setBlogs(formatted);
        }
    }, [data]);

    // Pagination
    const totalPages = Math.ceil(blogs.length / itemsPerPage);

    const paginatedBlogs = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return blogs.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, blogs]);

    const goToPage = (page: number) => setCurrentPage(page);
    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <MainLayout>
            <Helmet>
                <title>Blogs | One Off Autos</title>
                <meta
                    name="description"
                    content="Read the latest articles about car modifications, performance upgrades, and automotive tips from One Off Autos."
                />
                <link rel="canonical" href="https://www.oneoffautos.com/blogs" />
            </Helmet>

            {/* HEADER SECTION */}
            <div className="bg-oneoffautos-blue text-white py-16">
                <div className="container-custom">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">Blogs</h1>
                        <p className="text-xl">
                            The premier marketplace connecting buyers and sellers of unique, modified vehicles.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Latest Blogs</h1>

                {/* LOADING */}
                {loading && <p>Loading blogs...</p>}

                {/* EMPTY STATE */}
                {!loading && blogs.length === 0 && (
                    <div className="flex justify-center items-center py-16">
                        <div className="text-center">
                            <p className="text-xl text-gray-600 font-semibold">No blog found</p>
                            <p className="text-gray-500 mt-2">There are no blogs available at the moment.</p>
                        </div>
                    </div>
                )}

                {/* BLOG LIST */}
                {!loading && blogs.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {paginatedBlogs.map((blog) => (
                        <Link key={blog.id} to={`/${blog.slug}`} className="block">
                            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg h-full transition-shadow">
                                <div className="relative pb-[65%] overflow-hidden">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        width="286"
                                        height="185"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-0 right-0 bg-oneoffautos-red text-white px-3 py-1 m-3 rounded-md font-semibold">
                                        <span>{blog.category}</span>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-2 line-clamp-2">
                                        {blog.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                        <div dangerouslySetInnerHTML={{ __html: blog.excerpt }} />
                                    </p>

                                    <div className="flex items-center text-gray-600 text-sm">
                                        <Calendar size={16} className="mr-1" />
                                        <span className="mr-4">
                                            {new Date(blog.date).toLocaleDateString()}
                                        </span>

                                        <User size={16} className="mr-1" />
                                        <span>{blog.author}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        ))}
                    </div>
                )}

                {/* PAGINATION */}
                {!loading && blogs.length > 0 && totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                        <div className="flex space-x-1">
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-300 rounded-md text-oneoffautos-blue bg-white disabled:opacity-50"
                            >
                                Previous
                            </button>

                            {[...Array(totalPages)].map((_, idx) => {
                                const pageNum = idx + 1;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => goToPage(pageNum)}
                                        className={`px-4 py-2 border rounded-md ${currentPage === pageNum
                                            ? "border-oneoffautos-blue bg-oneoffautos-blue text-white"
                                            : "border-gray-300 text-oneoffautos-blue bg-white"
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-md text-oneoffautos-blue bg-white disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default Blogs;
