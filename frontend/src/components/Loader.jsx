const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin shadow-[0_0_10px_theme(colors.primary)]"></div>
    </div>
  );
};

export default Loader;
