import { ApiService } from "../data/apiService";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useState } from "react";
import { saveAs } from "file-saver";

export const Route = createRootRoute({
  component: () => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const apiService = new ApiService();

    const downloadCsv = (csvData: any) => {
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "data.csv");
    };

    return (
      <>
        {/* Page Container */}
        <div
          id="page-container"
          className="mx-auto flex min-h-dvh w-full min-w-[320px] flex-col dark:bg-gray-900 dark:text-gray-100"
        >
          {/* Page Header */}
          <header
            id="page-header"
            className="z-1 flex flex-none items-center bg-white shadow-sm dark:bg-gray-800"
          >
            <div className="container mx-auto px-4 lg:px-8 xl:max-w-7xl">
              <div className="flex justify-between py-4">
                {/* Left Section */}
                <div className="flex items-center gap-2 lg:gap-6">
                  {/* Logo */}
                  <a
                    href="/"
                    className="group inline-flex w-1/12 items-center gap-2 text-lg font-bold tracking-wide text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
                  >
                    <img src="/slipstream-logo.png" alt="logo" />
                  </a>
                  {/* END Logo */}

                  {/* Desktop Navigation */}
                  <nav className="hidden items-center gap-2 lg:flex">
                    <a
                      href="/"
                      className="group flex items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-600 active:border-blue-100 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white dark:active:border-gray-600"
                    >
                      <span>List Clients</span>
                    </a>
                    <a
                      href="addClient"
                      className="group flex items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-600 active:border-blue-100 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white dark:active:border-gray-600"
                    >
                      <span>Add Client</span>
                    </a>
                    <button
                      onClick={async () =>
                        downloadCsv(await apiService.exportClients())
                      }
                      className="group flex items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-600 active:border-blue-100 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white dark:active:border-gray-600"
                    >
                      <span>Export Clients</span>
                    </button>
                  </nav>
                  {/* END Desktop Navigation */}
                </div>
                {/* END Left Section */}

                {/* Right Section */}
                <div className="flex items-center gap-2">
                  {/* Toggle Mobile Navigation */}
                  <div className="lg:hidden">
                    <button
                      onClick={() => setMobileNavOpen(!mobileNavOpen)}
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300/25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600/40 dark:active:border-gray-700"
                    >
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        className="hi-solid hi-menu inline-block size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* END Toggle Mobile Navigation */}
                </div>
                {/* END Right Section */}
              </div>

              {/* Mobile Navigation */}
              <div className={`lg:hidden ${mobileNavOpen ? "" : "hidden"}`}>
                <nav className="flex flex-col gap-2 border-t border-gray-200 py-4 dark:border-gray-700">
                  <a
                    href="/"
                    className="group flex items-center gap-2 rounded-lg border border-blue-50 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 dark:border-transparent dark:bg-gray-700/75 dark:text-white"
                  >
                    <span>List Clients</span>
                  </a>
                  <a
                    href="addClient"
                    className="group flex items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-600 active:border-blue-100 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white dark:active:border-gray-600"
                  >
                    <span>Add Client</span>
                  </a>
                  <button
                    onClick={async () =>
                      downloadCsv(await apiService.exportClients())
                    }
                    className="group flex items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-600 active:border-blue-100 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white dark:active:border-gray-600"
                  >
                    <span>Export Clients</span>
                  </button>
                </nav>
              </div>
              {/* END Mobile Navigation */}
            </div>
          </header>
          {/* END Page Header */}

          <div className="p-2">
            <main
              id="page-content"
              className="flex max-w-full flex-auto flex-col"
            >
              <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
        {/* END Page Container */}
      </>
    );
  },
});
