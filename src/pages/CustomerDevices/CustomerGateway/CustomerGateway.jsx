import { useNavigate } from 'react-router-dom';

const CustomerGateway = ({ gateway }) => {
  const navigate = useNavigate();

  return (
    <div key={gateway._id}>
      <ul
        className="grid grid-cols-3 px-2 py-4 text-left hover:bg-gray-300"
        onClick={() => {
          navigate(`/customer-devices/${gateway._id}`);
        }}
      >
        <li>{gateway.name}</li>
        <li>{new Date(gateway.createdAt).toLocaleDateString('en-GB')}</li>
        <li>{gateway.connectstatus}</li>
      </ul>
    </div>
  );
};

export default CustomerGateway;
