import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div>
      signup hogya
      <br />
      <button
        className="my-4 mx-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-900 transition"
        onClick={() => navigate("/login")}
      > login ke chlo
      </button>
    </div>
  );
};

export default SignUp
