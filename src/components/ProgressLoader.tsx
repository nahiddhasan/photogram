const ProgressLoader = ({ progress }: { progress: number }) => {
  return (
    <svg className={`w-5 h-5 rotate-[-90deg]`} viewBox="0 0 36 36">
      {/* Background Circle */}
      <path
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="#e5e7eb" // Tailwind 'gray-200'
        strokeWidth="4"
      />
      {/* Progress Circle */}
      <path
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="#FF0000"
        strokeWidth="4"
        strokeDasharray={`${progress}, 100`}
      />
    </svg>
  );
};

export default ProgressLoader;
