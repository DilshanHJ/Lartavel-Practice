import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link, router } from "@inertiajs/react";

const Index = ({ auth, projects, queryParams = null }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("projects.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key === "Enter") {
            searchFieldChanged(name, e.target.value);
        }
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2
                    onClick={() => console.log(projects.meta.links)}
                    className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
                >
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500 ">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2">ID</th>
                                        <th className="px-3 py-2">Image</th>
                                        <th className="px-3 py-2">Name</th>
                                        <th className="px-3 py-2">Status</th>
                                        <th className="px-3 py-2">
                                            Create Date
                                        </th>
                                        <th className="px-3 py-2">Due Date</th>
                                        <th className="px-3 py-2">
                                            Created By
                                        </th>
                                        <th className="px-3 py-2">Actions</th>
                                    </tr>
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2">
                                            <TextInput
                                                defaultValue={queryParams.name}
                                                className="w-full"
                                                placeholder="Project Name"
                                                onBlur={(e) =>
                                                    searchFieldChanged(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                onKeyPress={(e) =>
                                                    onKeyPress("name", e)
                                                }
                                            />
                                        </th>
                                        <th className="px-3 py-2">
                                            <SelectInput
                                                defaultValue={
                                                    queryParams.status
                                                }
                                                className="w-full"
                                                onChange={(e) =>
                                                    searchFieldChanged(
                                                        "status",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">Status</option>
                                                {Object.keys(
                                                    PROJECT_STATUS_TEXT_MAP
                                                ).map((status) => (
                                                    <option
                                                        key={status}
                                                        value={status}
                                                    >
                                                        {
                                                            PROJECT_STATUS_TEXT_MAP[
                                                                status
                                                            ]
                                                        }
                                                    </option>
                                                ))}
                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map((project, index) => (
                                        <tr
                                            key={index}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                            <td className="px-3 py-2 ">
                                                {project.id}
                                            </td>
                                            <td className="px-3 py-2 ">
                                                <img
                                                    className="w-20 h-20 rounded-full"
                                                    src={project.image_path}
                                                    alt=""
                                                />
                                            </td>
                                            <th className="px-3 py-2 hover:underline text-nowrap text-white hover:text-blue-500">
                                                <Link
                                                    href={route(
                                                        "projects.show",
                                                        project.id
                                                    )}
                                                >
                                                    {project.name}
                                                </Link>
                                            </th>
                                            <td className="px-3 py-2 ">
                                                <span
                                                    className={
                                                        "px-2 py-1 rounded text-white w-24 block text-center " +
                                                        PROJECT_STATUS_CLASS_MAP[
                                                            project.status
                                                        ]
                                                    }
                                                >
                                                    {
                                                        PROJECT_STATUS_TEXT_MAP[
                                                            project.status
                                                        ]
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 ">
                                                {project.created_at}
                                            </td>
                                            <td className="px-3 py-2 ">
                                                {project.due_date}
                                            </td>
                                            <td className="px-3 py-2 ">
                                                {project.createdBy.name}
                                            </td>
                                            <td className="px-3 py-2 ">
                                                <Link
                                                    href={route(
                                                        "projects.edit",
                                                        project.id
                                                    )}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "projects.destroy",
                                                        project.id
                                                    )}
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2"
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};
export default Index;
