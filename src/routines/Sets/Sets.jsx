import { useAuth } from "../../auth/AuthContext";
import useMutation from "../../api/useMutation";

function Sets({ sets }) {
  const { token } = useAuth();

  return (
    <>
      <h3>Sets</h3>
      {sets.length > 0 ? (
        <ul className="sets">
          {sets.map((set) => (
            <li key={set.id}>
              <p>
                {set.name} x {set.count}
              </p>
              {token && <DeleteButton id={set.id} />}
            </li>
          ))}
        </ul>
      ) : (
        <p>This routine does not have any sets. Add one?</p>
      )}
    </>
  );
}

function DeleteButton({ id }) {
  const {
    mutate: deleteSet,
    loading,
    error,
  } = useMutation("DELETE", `/sets/${id}`, ["routines", "routine"]);

  return (
    <button onClick={() => deleteSet()}>
      {loading ? "Deleting" : error ?? "Delete Set"}
    </button>
  );
}

export default Sets;
