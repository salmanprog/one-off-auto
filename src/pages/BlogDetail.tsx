import { useState, useMemo, useEffect } from "react";
import MainLayout from "../components/layouts/MainLayout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { useFetch } from "../hooks/request";
import { useParams } from 'react-router-dom';

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
    // Fetch API
    const { slug } = useParams<{ slug: string }>();
    const { data, loading, error } = useFetch("blog_list", "mount", slug);
    return (
        <MainLayout>
            <Helmet>
                <title>Blogs | One Off Autos</title>
                <title>{data?.title || "Blog"} | One Off Autos</title>
                <meta name="description" content={data?.meta_description || ""} />
                <link rel="canonical" href={`https://www.oneoffautos.com/${slug}`} />
            </Helmet>

            {/* HEADER SECTION */}
            <div className="bg-oneoffautos-blue text-white py-16">
                <div className="container-custom">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">{data?.title}</h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10">
                
                {/* LOADING */}
                {loading && <p className="text-center text-lg">Loading blog...</p>}

                {/* ERROR */}
                {error && <p className="text-center text-red-500 text-lg">Blog not found.</p>}

                {/* IF NO BLOG */}
                {!loading && !data && (
                    <p className="text-center text-gray-500 text-lg">
                        Blog not found or removed.
                    </p>
                )}

                {/* BLOG CONTENT */}
                {data && (
                    <div className="max-w-4xl mx-auto">
                        
                        {/* TITLE */}
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h1>

                        {/* META */}
                        <div className="flex items-center text-gray-600 mb-6">
                            <Calendar size={18} className="mr-2" />
                            {new Date(data.created_at).toLocaleDateString()}
                        </div>

                        {/* IMAGE */}
                        <img
                            src={data.image_url}
                            alt={data.title}
                            className="w-full rounded-lg shadow mb-8"
                        />

                        {/* CATEGORY */}
                        {data.category && (
                            <span className="inline-block bg-oneoffautos-blue text-white px-3 py-1 rounded-md text-sm mb-4">
                                {data.category.title}
                            </span>
                        )}

                        {/* DESCRIPTION */}
                        <div
                            className="quill-content mt-4"
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        />
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default Blogs;
