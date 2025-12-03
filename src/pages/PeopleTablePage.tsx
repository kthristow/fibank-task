import { useAuth } from "../hooks/useAuth";
import PeopleTable from "../components/PeopleTable";
import Pagination from "../components/Pagination";
import Spinner from "../components/common/Spinner";
import Alert from "../components/common/Alert";
import Modal from "../components/common/Modal";
import { usePeopleTable } from "../hooks/usePeopleTable";
import offlineImg from "../assets/offline.png";

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
          <img
            src={offlineImg}
            alt="Offline illustration"
            className="mx-auto max-h-40"
          />
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
