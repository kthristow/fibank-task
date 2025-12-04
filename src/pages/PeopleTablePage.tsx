import { useAuth } from "../hooks/useAuth";
import PeopleTable from "../components/PeopleTable";
import Pagination from "../components/Pagination";
import Spinner from "../components/common/Spinner";
import Alert from "../components/common/Alert";
import Modal from "../components/common/Modal";
import { usePeopleTable } from "../hooks/usePeopleTable";

const PeopleTablePage = () => {
  const { username, logout } = useAuth();
  const {
    people,
    loading,
    error,
    currentPage,
    totalPages,
    goToPage,
    showOfflineModal,
    closeOfflineModal,
    refetch,
  } = usePeopleTable();

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
        <div className="text-sm text-slate-600">
          Logged in as{" "}
          <span className="font-semibold text-slate-900">
            {username ?? "User"}
          </span>
        </div>
        <button
          onClick={logout}
          className="rounded-md border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
        >
          Logout
        </button>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-6">
        <h1 className="mb-4 text-xl font-semibold text-slate-800">
          Star Wars Characters
        </h1>
        <p className="mb-4 text-sm text-slate-600">
          Simple example of a responsive, paginated table with caching and
          offline handling.
        </p>

        {error && <Alert variant="error" message={error} />}

        {loading ? (
          <Spinner />
        ) : (
          <>
            <PeopleTable people={people} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
            <div className="mt-4 text-xs text-slate-500">
              Note: Data is cached per page in localStorage for 5 minutes.
            </div>
          </>
        )}
      </main>

      <Modal
        isOpen={showOfflineModal}
        onClose={closeOfflineModal}
        title="You are offline"
      >
        <div className="space-y-3 text-sm text-slate-700">
          <p>
            We couldn&apos;t fetch fresh data because your connection appears to
            be offline.
          </p>
          <svg
            className="mx-auto h-40 w-40 text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
            />
          </svg>
          <p className="text-xs text-slate-500">
            You can simulate this in DevTools by setting the Network mode to
            &quot;Offline&quot; and triggering a fetch again.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={refetch}
              className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
            >
              Retry
            </button>
            <button
              onClick={closeOfflineModal}
              className="rounded-md border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PeopleTablePage;
