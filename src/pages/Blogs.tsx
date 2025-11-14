
import { useState, useMemo } from "react";
import MainLayout from "../components/layouts/MainLayout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";

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
    const itemsPerPage = 9; // Adjust as needed

    // Dummy blog data - 12 blogs for pagination demo
    const blogs: Blog[] = [
        {
            id: "1",
            title: "Top 10 Engine Modifications for Maximum Performance",
            excerpt: "Discover the best engine modifications that can boost your car's horsepower and torque. From turbochargers to ECU tuning, learn what works best for your ride.",
            image: "/product-img-1.avif",
            date: "2024-01-15",
            author: "John Smith",
            category: "Performance",
            slug: "top-10-engine-modifications"
        },
        {
            id: "2",
            title: "Complete Guide to Suspension Upgrades",
            excerpt: "Everything you need to know about upgrading your car's suspension system. Coilovers, air suspension, and lowering springs explained in detail.",
            image: "/product-img-2.avif",
            date: "2024-01-10",
            author: "Sarah Johnson",
            category: "Suspension",
            slug: "complete-guide-suspension-upgrades"
        },
        {
            id: "3",
            title: "Best Wheels and Tires for Modified Cars",
            excerpt: "Choosing the right wheels and tires can make or break your build. Learn about fitment, offset, and tire selection for the perfect stance.",
            image: "/placeholder.svg",
            date: "2024-01-05",
            author: "Mike Davis",
            category: "Wheels",
            slug: "best-wheels-tires-modified-cars"
        },
        {
            id: "4",
            title: "Body Kit Installation: DIY vs Professional",
            excerpt: "Should you install body kits yourself or hire a professional? We break down the pros and cons of each approach to help you decide.",
            image: "/product-img-1.avif",
            date: "2024-01-01",
            author: "Emily Chen",
            category: "Body Mods",
            slug: "body-kit-installation-diy-vs-professional"
        },
        {
            id: "5",
            title: "ECU Tuning: Unlock Your Car's Hidden Potential",
            excerpt: "Learn how ECU tuning can dramatically improve your car's performance. Understand the basics of remapping and what to expect from a professional tune.",
            image: "/product-img-2.avif",
            date: "2023-12-28",
            author: "David Wilson",
            category: "Performance",
            slug: "ecu-tuning-unlock-potential"
        },
        {
            id: "6",
            title: "Turbocharger vs Supercharger: Which is Better?",
            excerpt: "Comparing turbochargers and superchargers to help you decide which forced induction method suits your build and driving style best.",
            image: "/product-img-1.avif",
            date: "2023-12-25",
            author: "Robert Taylor",
            category: "Performance",
            slug: "turbocharger-vs-supercharger"
        },
        {
            id: "7",
            title: "Air Suspension Setup Guide for Beginners",
            excerpt: "Everything you need to know about installing and tuning air suspension systems. From compressors to management systems, we cover it all.",
            image: "/placeholder.svg",
            date: "2023-12-20",
            author: "Lisa Anderson",
            category: "Suspension",
            slug: "air-suspension-setup-guide"
        },
        {
            id: "8",
            title: "Wheel Fitment Calculator: Get Perfect Stance",
            excerpt: "Master the art of wheel fitment with our comprehensive guide. Learn about offset, width, and diameter to achieve the perfect look.",
            image: "/product-img-2.avif",
            date: "2023-12-15",
            author: "James Brown",
            category: "Wheels",
            slug: "wheel-fitment-calculator"
        },
        {
            id: "9",
            title: "Carbon Fiber Body Parts: Worth the Investment?",
            excerpt: "Explore the benefits and drawbacks of carbon fiber body modifications. Is the weight savings and aesthetic worth the premium price?",
            image: "/product-img-1.avif",
            date: "2023-12-10",
            author: "Maria Garcia",
            category: "Body Mods",
            slug: "carbon-fiber-body-parts"
        },
        {
            id: "10",
            title: "Exhaust System Upgrades: Sound and Performance",
            excerpt: "Choosing the right exhaust system can enhance both sound and performance. Learn about headers, cat-backs, and axle-back systems.",
            image: "/placeholder.svg",
            date: "2023-12-05",
            author: "Chris Martinez",
            category: "Performance",
            slug: "exhaust-system-upgrades"
        },
        {
            id: "11",
            title: "Coilover Installation: Step-by-Step Guide",
            excerpt: "A detailed walkthrough of installing coilovers on your vehicle. Tips, tricks, and common mistakes to avoid during installation.",
            image: "/product-img-2.avif",
            date: "2023-12-01",
            author: "Jennifer Lee",
            category: "Suspension",
            slug: "coilover-installation-guide"
        },
        {
            id: "12",
            title: "Tire Selection for Track Days and Daily Driving",
            excerpt: "Find the perfect balance between track performance and daily drivability. Learn about tire compounds, sizes, and when to replace them.",
            image: "/product-img-1.avif",
            date: "2023-11-28",
            author: "Kevin White",
            category: "Wheels",
            slug: "tire-selection-track-daily"
        }
    ];

    const totalPages = Math.ceil(blogs.length / itemsPerPage);

    const paginatedBlogs = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return blogs.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage]);

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const nextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedBlogs.map((blog) => (
                        <Link key={blog.id} to={`/blogs/${blog.slug}`} className="block">
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
                                        {blog.excerpt}
                                    </p>

                                    <div className="flex items-center text-gray-600 text-sm">
                                        <Calendar size={16} className="mr-1" />
                                        <span className="mr-4">{new Date(blog.date).toLocaleDateString()}</span>
                                        <User size={16} className="mr-1" />
                                        <span>{blog.author}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
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
    )
};
export default Blogs;