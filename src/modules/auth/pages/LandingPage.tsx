import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { 
  ShieldCheck, Users, CalendarDays, Star, 
  Search, Calendar, Dumbbell, Check, MapPin
} from "lucide-react";

// Image imports (Assuming they prefix with hero_gym, gym_iron_forge, etc.)
// In a real Vite app without explicit loaders we might need dynamic imports, but standard relative paths work if they exist.
import heroGymImage from "../../../assets/images/hero_gym_1774606909966.png";
import gymIronForge from "../../../assets/images/gym_iron_forge_1774606931678.png";
import gymUrbanPulse from "../../../assets/images/gym_urban_pulse_1774606955008.png";
import gymCoreMotion from "../../../assets/images/gym_core_motion_1774606994289.png";
import gymApexPerf from "../../../assets/images/gym_apex_perf_1774607012514.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col font-sans">
      
      {/* ── 1. Hero Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        {/* Left Text Box */}
        <div className="flex-1 flex flex-col items-start text-left lg:pr-8">
          <h1 className="text-5xl sm:text-[64px] font-extrabold text-gray-900 leading-[1.05] tracking-tight mb-6">
            One <br />
            membership. <br />
            <span className="text-flex-primary">Multiple gyms.</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-[420px] leading-relaxed">
            Access verified gyms, book time slots, and train on your schedule.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="w-full sm:w-[180px]">
              <Button 
                label="Get FlexPass" 
                showArrow={false} 
                onClick={() => navigate("/auth")}
              />
            </div>
            <button 
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
              onClick={() => navigate("#partner-gyms")}
            >
              View partner gyms
            </button>
          </div>
        </div>

        {/* Right Image Box */}
        <div className="flex-1 w-full max-w-[600px] relative">
          <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl relative">
            <img 
              src={heroGymImage} 
              alt="Premium Gym Interior" 
              className="w-full h-full object-cover object-center"
            />
            {/* Live Capacity Floating Badge */}
            <div className="absolute bottom-6 left-6 bg-white py-3 px-5 rounded-xl shadow-lg flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="text-sm font-bold text-gray-900">Live Capacity: 85%</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Benefits Bar ── */}
      <section className="w-full border-y border-gray-100 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-flex-primary/10 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-flex-primary" />
            </div>
            <span className="text-sm font-semibold text-gray-700">Verified gyms</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-flex-primary/10 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-flex-primary" />
            </div>
            <span className="text-sm font-semibold text-gray-700">Controlled capacity</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-flex-primary/10 rounded-xl flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-flex-primary" />
            </div>
            <span className="text-sm font-semibold text-gray-700">Flexible plans</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-flex-primary/10 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-flex-primary" />
            </div>
            <span className="text-sm font-semibold text-gray-700">Priority access</span>
          </div>
        </div>
      </section>

      {/* ── 3. How FlexPass Works ── */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center">
        <h2 className="text-3xl sm:text-[32px] font-bold text-gray-900 mb-3 tracking-tight">How FlexPass Works</h2>
        <p className="text-gray-500 text-sm mb-16 text-center max-w-lg">Simple steps to get you moving.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-8 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2rem]">
            <div className="w-16 h-16 bg-flex-primary/10 rounded-full flex items-center justify-center mb-6">
              <Search className="w-7 h-7 text-flex-primary" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Choose a Membership</h3>
            <p className="text-sm text-gray-500 leading-relaxed px-4">
              Select a plan based on your fitness needs.
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-8 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2rem]">
            <div className="w-16 h-16 bg-flex-primary/10 rounded-full flex items-center justify-center mb-6">
              <Calendar className="w-7 h-7 text-flex-primary" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Book Gym Slots</h3>
            <p className="text-sm text-gray-500 leading-relaxed px-4">
              Check real-time gym availability and reserve your visit.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-8 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2rem]">
            <div className="w-16 h-16 bg-flex-primary/10 rounded-full flex items-center justify-center mb-6">
              <Dumbbell className="w-7 h-7 text-flex-primary" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Train Across Gyms</h3>
            <p className="text-sm text-gray-500 leading-relaxed px-4">
              Visit partner gyms and optionally book trainers during your slot.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. Choose Your Plan ── */}
      <section className="bg-[#fafafa] w-full py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h2 className="text-3xl sm:text-[32px] font-bold text-gray-900 mb-3 tracking-tight">Choose Your Plan</h2>
          <p className="text-gray-500 text-sm mb-16 text-center max-w-lg">Flexible options for every fitness journey.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-0 lg:px-8">
            
            {/* Basic Card */}
            <div className="bg-white rounded-[2rem] p-10 flex flex-col border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
              <span className="bg-gray-100 text-gray-800 text-xs font-bold px-3 py-1 rounded-full self-start mb-6">Basic</span>
              <div className="flex items-end gap-1 mb-8">
                <span className="text-4xl font-extrabold text-gray-900">₹1,200</span>
                <span className="text-sm text-gray-500 mb-1">/month</span>
              </div>
              <ul className="flex flex-col gap-4 mb-10 flex-1">
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-500 shrink-0" /><span className="text-sm text-gray-600">Access Basic gyms only</span></li>
                <li className="flex items-start gap-3 opacity-40"><Check className="w-5 h-5 text-gray-400 shrink-0" /><span className="text-sm text-gray-400">No metro city gyms</span></li>
                <li className="flex items-start gap-3 opacity-40"><Check className="w-5 h-5 text-gray-400 shrink-0" /><span className="text-sm text-gray-400">No trainer sessions</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-500 shrink-0" /><span className="text-sm text-gray-600">1 check-in per day</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-500 shrink-0" /><span className="text-sm text-gray-600">Normal slot access</span></li>
              </ul>
              <button 
                onClick={() => navigate("/auth")}
                className="w-full py-3.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
              >
                Choose Basic
              </button>
            </div>

            {/* Standard Card */}
            <div className="bg-white rounded-[2rem] p-10 flex flex-col border border-blue-100 shadow-[0_8px_40px_rgb(59,130,246,0.06)] relative top-0 md:-top-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full self-start mb-6">Standard</span>
              <div className="flex items-end gap-1 mb-8">
                <span className="text-4xl font-extrabold text-gray-900">₹2,000</span>
                <span className="text-sm text-gray-500 mb-1">/month</span>
              </div>
              <ul className="flex flex-col gap-4 mb-10 flex-1">
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-500 shrink-0" /><span className="text-sm text-gray-600">Access Basic + Standard gyms</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-500 shrink-0" /><span className="text-sm text-gray-600">Metro city gym access</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-500 shrink-0" /><span className="text-sm text-gray-600">2 free trainer sessions/mo</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-500 shrink-0" /><span className="text-sm text-gray-600">1 check-in per day</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-500 shrink-0" /><span className="text-sm text-gray-600">Normal slot access</span></li>
              </ul>
              <button 
                onClick={() => navigate("/auth")}
                className="w-full py-3.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
              >
                Choose Standard
              </button>
            </div>

            {/* Premium Card */}
            <div className="bg-white rounded-[2rem] p-10 flex flex-col border-2 border-flex-primary shadow-[0_12px_40px_rgb(45,90,83,0.12)] relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-flex-primary text-white text-[10px] font-bold uppercase tracking-widest py-1 px-4 rounded-full">
                Most Popular
              </div>
              <span className="bg-flex-primary/10 text-flex-primary text-xs font-bold px-3 py-1 rounded-full self-start mb-6">Premium</span>
              <div className="flex items-end gap-1 mb-8">
                <span className="text-4xl font-extrabold text-gray-900">₹4,000</span>
                <span className="text-sm text-gray-500 mb-1">/month</span>
              </div>
              <ul className="flex flex-col gap-4 mb-10 flex-1">
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-500 shrink-0" /><span className="text-sm text-gray-600">Access all gyms (Basic+Standard+Premium)</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-500 shrink-0" /><span className="text-sm text-gray-600">Metro city gym access</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-500 shrink-0" /><span className="text-sm text-gray-600">1 free trainer session/week</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-500 shrink-0" /><span className="text-sm text-gray-600">2 check-ins per day</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-500 shrink-0" /><span className="text-sm text-gray-600">Priority access in slot booking</span></li>
              </ul>
              <Button 
                label="Get Premium" 
                showArrow={false} 
                onClick={() => navigate("/auth")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Partner Gyms ── */}
      <section id="partner-gyms" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-[32px] font-bold text-gray-900 mb-3 tracking-tight">Partner Gyms</h2>
            <p className="text-gray-500 text-sm">Access top-rated facilities across the city with a single membership.</p>
          </div>
          <a href="#" className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            Explore all gyms
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mt-0.5">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Gym 1 */}
          <div className="bg-white rounded-[1.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-[4/3] bg-gray-100 relative">
              <img src={gymIronForge} alt="Iron Forge Fitness" className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-purple-100 text-purple-800 text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">Premium</div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-900 text-[15px] mb-1.5">Iron Forge Fitness</h3>
              <p className="flex items-center gap-1.5 text-xs text-gray-500">
                <MapPin className="w-3.5 h-3.5 shrink-0" /> Downtown Metro
              </p>
            </div>
          </div>
          {/* Gym 2 */}
          <div className="bg-white rounded-[1.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-[4/3] bg-gray-100 relative">
              <img src={gymUrbanPulse} alt="Urban Pulse Gym" className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">Standard</div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-900 text-[15px] mb-1.5">Urban Pulse Gym</h3>
              <p className="flex items-center gap-1.5 text-xs text-gray-500">
                <MapPin className="w-3.5 h-3.5 shrink-0" /> Westside District
              </p>
            </div>
          </div>
          {/* Gym 3 */}
          <div className="bg-white rounded-[1.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-[4/3] bg-gray-100 relative">
              <img src={gymCoreMotion} alt="Core Motion Studio" className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">Basic</div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-900 text-[15px] mb-1.5">Core Motion Studio</h3>
              <p className="flex items-center gap-1.5 text-xs text-gray-500">
                <MapPin className="w-3.5 h-3.5 shrink-0" /> North Hills
              </p>
            </div>
          </div>
          {/* Gym 4 */}
          <div className="bg-white rounded-[1.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-[4/3] bg-gray-100 relative">
              <img src={gymApexPerf} alt="Apex Performance" className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-purple-100 text-purple-800 text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">Premium</div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-900 text-[15px] mb-1.5">Apex Performance</h3>
              <p className="flex items-center gap-1.5 text-xs text-gray-500">
                <MapPin className="w-3.5 h-3.5 shrink-0" /> Financial District
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Final CTA Banner ── */}
      <section className="bg-white py-24 mb-10 w-full">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center px-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            Train smarter with FlexPass
          </h2>
          <p className="text-gray-600 mb-10 text-lg">
            One membership. Multiple gyms. Total flexibility.
          </p>
          <div className="w-[180px]">
            <Button 
              label="Get FlexPass" 
              showArrow={false} 
              onClick={() => navigate("/auth")}
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
