interface FacilitiesProps {
  selected: string[];
  onChange: (facilities: string[]) => void;
}

const FacilitiesForm = ({ selected, onChange }: FacilitiesProps) => {
  const facilities = [
    { id: "strength", label: "Strength Training Equipment" },
    { id: "cardio", label: "Cardio Equipment" },
    { id: "locker", label: "Locker / Changing Room" },
    { id: "shower", label: "Shower Facility" },
    { id: "ac", label: "Air Conditioning" },
    { id: "parking_2", label: "Two-wheeler Parking" },
    { id: "parking_4", label: "Four-wheeler Parking" },
  ];

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((item) => item !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
      {facilities.map((fac) => (
        <label key={fac.id} className="flex items-center gap-4 cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              checked={selected.includes(fac.id)}
              onChange={() => toggle(fac.id)}
              className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-50 checked:bg-flex-primary checked:border-flex-primary transition-all duration-200"
            />
            <svg
              className="absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
            {fac.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesForm;
