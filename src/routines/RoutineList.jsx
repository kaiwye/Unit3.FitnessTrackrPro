import { Link } from "react-router-dom";
import useQuery from "../api/useQuery";

function RoutineList() {
  const { data: routines, loading, error } = useQuery("/routines", "routines");

  if (loading || !routines) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <ul>
      {routines.map((routine) => (
        <li key={routine.id}>
          <Link to={`/routines/${routine.id}`}>{routine.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default RoutineList;
