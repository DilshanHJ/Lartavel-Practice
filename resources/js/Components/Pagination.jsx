import { Link } from "@inertiajs/react";
const Pagination = ({ links }) => {
    return (
        <nav className="mt-6 text-center">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url}
                    className={
                        "relative inline-flex items-center px-4 py-2 border text-sm font-medium text-gray-200 bg-gray-800 border-gray-300 hover:bg-gray-700 " +
                        (link.active ? " bg-gray-700 " : "") +
                        (!link.url ? "cursor-not-allowed" : "")
                    }
                    dangerouslySetInnerHTML={{ __html: link.label }}
                ></Link>
            ))}
        </nav>
    );
};
export default Pagination;
