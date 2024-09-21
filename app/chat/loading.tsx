const loading = () => {
  return (
    <div className="w-screen h-[calc(100vh-80px)] flex flex-col gap-4 justify-center items-center">
      <span className="loading loading-infinity loading-lg"></span>
      <p>Please wait...</p>
    </div>
  );
};

export default loading;
