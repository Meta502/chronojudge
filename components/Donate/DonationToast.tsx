import toast from "react-hot-toast";
import Link from "../General/Link";

const donationToast = () => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      style={{ backgroundColor: "#333333" }}
    >
      <div className="flex-1 w-0 p-6">
        <div className="flex items-start">
          <div className="flex-1">
            <p className="text-md font-medium text-white">
              ChronoJudge needs donations.
            </p>
            <p className="-ml-1 mt-1 text-sm text-white">
              <Link href="/donate">Click here</Link> for more info.
            </p>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default donationToast;
