import { ApiService } from "../data/apiService";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Client } from "../data/models/Client";
import { useEffect, useState } from "react";
import SuccessAlert from "../components/successAlert";
import Modal from "../components/buttonModal";
import AddressTable from "../components/addressTable";
import PhoneTable from "../components/phoneTable";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const apiService = new ApiService();
  const { updated, added, deleted } = Route.useSearch<{
    updated: boolean;
    added: boolean;
    deleted: boolean;
  }>();
  const navigate = useNavigate({ from: "/" });
  const goBack = () => navigate({ search: { updated: true } });

  let [clients, setClients] = useState<Client[]>([]);
  let [search, setSearch] = useState("");
  let [loading, setLoading] = useState(true);

  const getData = async () => {
    setClients((await apiService.getClients()) ?? []);
    setLoading(false);
  };

  const deleteClient = async (id: number) => {
    const res = await apiService.deleteClient(id);
    console.log(res);
    window.location.href = "/?deleted=true";
    const newClients = clients.filter((c) => c.id === id);
    setClients(newClients);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="p-2">
        <main id="page-content" className="flex max-w-full flex-auto flex-col">
          <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl">
            <h2>Content Loading...</h2>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="pb-5">
          <SuccessAlert
            message={
              "Client successfully " +
              (added ? "added" : deleted ? "deleted" : "updated")
            }
            visible={added || updated || deleted}
          />
        </div>
        <div className="mb-5 flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <h3 className="mb-1 font-semibold">All Clients</h3>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              There are {clients.length} clients total
            </h4>
          </div>
          <div className="flex items-center justify-center gap-2">
            <a
              href="/addClient"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-700 bg-blue-700 px-3 py-2 text-sm font-semibold leading-5 text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring focus:ring-blue-400/50 active:border-blue-700 active:bg-blue-700 dark:focus:ring-blue-400/90"
            >
              Add New Client
            </a>
          </div>
        </div>
        <div className="pb-5">
          <div className="space-y-1 pl-6 pt-4">
            <label htmlFor="search" className="font-medium">
              Search:{" "}
            </label>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Enter search query"
              className="inline-flex items-center justify-center space-x-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="min-w-full overflow-x-auto rounded border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <table className="min-w-full whitespace-nowrap align-middle text-sm">
            <thead>
              <tr>
                <th className="bg-gray-100/75 px-3 py-4 text-left font-semibold text-gray-900 dark:bg-gray-700/25 dark:text-gray-50">
                  First Name
                </th>
                <th className="bg-gray-100/75 px-3 py-4 text-left font-semibold text-gray-900 dark:bg-gray-700/25 dark:text-gray-50">
                  Last Name
                </th>
                <th className="bg-gray-100/75 px-3 py-4 text-left font-semibold text-gray-900 dark:bg-gray-700/25 dark:text-gray-50">
                  Gender
                </th>
                <th className="bg-gray-100/75 px-3 py-4 text-left font-semibold text-gray-900 dark:bg-gray-700/25 dark:text-gray-50">
                  Date of Birth
                </th>
                <th className="bg-gray-100/75 px-3 py-4 text-left font-semibold text-gray-900 dark:bg-gray-700/25 dark:text-gray-50">
                  Phone Numbers
                </th>
                <th className="bg-gray-100/75 px-3 py-4 text-left font-semibold text-gray-900 dark:bg-gray-700/25 dark:text-gray-50">
                  Addresses
                </th>
                <th className="bg-gray-100/75 px-3 py-4 text-center font-normal text-gray-900 dark:bg-gray-700/25 dark:text-gray-50">
                  Options
                </th>
              </tr>
            </thead>

            <tbody>
              {clients
                .filter(
                  (s) =>
                    s.firstName.toLowerCase().includes(search.toLowerCase()) ||
                    s.lastName.toLowerCase().includes(search.toLowerCase()),
                )
                .map((client) => (
                  <tr
                    className="even:bg-gray-50 dark:even:bg-gray-900/50"
                    key={client.id}
                  >
                    <td className="p-3">{client.firstName}</td>
                    <td className="p-3">{client.lastName}</td>
                    <td className="p-3">{client.gender}</td>
                    <td className="p-3">
                      {new Date(client.dateOfBirth).toDateString()}
                    </td>
                    <td className="p-3">
                      <Modal label="View" title="Addresses"> 
                        <PhoneTable phoneNumbers={client.phoneNumbers} viewOnly />
                      </Modal>
                    </td>
                    <td className="p-3">
                      <Modal label="View" title="Addresses">
                        <AddressTable addresses={client.addresses} viewOnly />
                      </Modal>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => deleteClient(client.id)}
                        className="border--200 m-3 inline-flex gap-2 rounded-lg border bg-white px-2 py-1 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300/25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600/40 dark:active:border-gray-700"
                      >
                        Delete
                      </button>
                      <a
                        href={`/addClient?id=${client.id}`}
                        className="inline-flex gap-2 rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300/25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600/40 dark:active:border-gray-700"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
