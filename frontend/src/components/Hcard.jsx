

const Hcard = ({ title, description }) => {
  return (
    <div className="bg-white w-[300px] h-[200px] text-slate-900 p-6 rounded-2xl shadow hover:shadow-xl transition duration-300">
     <h1 className="text-xl font-Swis721 WGL4 BT Bold text-gray-800 text-center mb-4">{title}</h1>
  <h5 className="text-blue-600 text-5xl text-center font-bold ">{description}</h5>
    </div>
  );
};

export default Hcard;






