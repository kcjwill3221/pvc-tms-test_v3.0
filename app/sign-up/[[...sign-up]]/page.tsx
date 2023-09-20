import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp />;
}

// import { useClient } from "next/react";
// import { useSignUp } from "@clerk/clerk-react";
// import '../globals.css';
// import Link from "next/link";
//
// const CreateAccountPage = () => {
//     const { signUp } = useSignUp();
//     useClient();
//
//     const handleSignUp = async (e) => {
//         e.preventDefault();
//
//         const email = "user@yahoo.com";
//         const password = "securepassword";
//
//     };
//
//     return (
//         <ClientComponent>
//         <div className="relative bg-white w-full h-[64rem] overflow-hidden text-left text-[1.5rem] text-dimgray-200 font-inter">
//
//             <div className="absolute top-[0rem] left-[0rem] bg-ddcaae w-[33.5rem] h-[64rem]" />
//
//             <img className="absolute top-[0rem] left-[0rem] w-[45rem] h-[43.42rem]" alt="" src="/vector.svg" />
//
//             <div className="absolute top-[0rem] left-[29.5rem] bg-silver w-full h-[64rem]" />
//
//             <b className="absolute top-[5.75rem] left-[41.25rem] text-[3rem] inline-block text-darkslategray w-[24.69rem] h-[4.56rem]">
//                 Create Account
//             </b>
//
//             <div className="absolute top-[19.5rem] left-[8.19rem] rounded-xl bg-drk-khaki
//                 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)_inset,_0px_4px_4px_rgba(0,_0,_0,_0.25)_inset]
//                 w-[28.25rem] h-[38.19rem] mix-blend-normal" />
//
//             <img className="absolute top-[32.44rem] left-[13.88rem] rounded-xl w-[22.56rem] h-[25.25rem] overflow-hidden" alt="" src="/smolcat.svg" />
//
//             <form onSubmit={handleSignUp}>
//                 {/* First Name */}
//                 <div className="absolute top-[17.38rem] left-[40.19rem] rounded-xl box-border w-[20.75rem] h-[4.31rem] overflow-hidden border-[1px] border-solid border-greh" />
//                 <div className="absolute top-[15.88rem] left-[41.44rem] bg-silver flex flex-row p-[0.63rem] items-center justify-center">
//                     <div className="relative font-semibold">First Name</div>
//                 </div>
//
//                 {/* Last Name */}
//                 <div className="absolute top-[17.38rem] left-[64.69rem] rounded-xl box-border w-[20.75rem] h-[4.31rem] overflow-hidden border-[1px] border-solid border-greh" />
//                 <div className="absolute top-[15.88rem] left-[65.94rem] bg-silver flex flex-row p-[0.63rem] items-center justify-center">
//                     <div className="relative font-semibold">Last Name</div>
//                 </div>
//
//                 {/* E-mail */}
//                 <div className="absolute top-[26.63rem] left-[41.44rem] bg-silver flex flex-row p-[0.63rem] items-center justify-center">
//                     <div className="relative font-semibold">E-mail</div>
//                 </div>
//                 <div className="absolute top-[28.13rem] left-[40.19rem] rounded-xl box-border w-[20.75rem] h-[4.31rem] overflow-hidden border-[1px] border-solid border-greh" />
//
//                 {/* Password */}
//                 <div className="absolute top-[26.63rem] left-[65.94rem] bg-silver flex flex-row p-[0.63rem] items-center justify-center">
//                     <div className="relative font-semibold">Password</div>
//                 </div>
//                 <div className="absolute top-[28.13rem] left-[64.69rem] rounded-xl box-border w-[20.75rem] h-[4.31rem] overflow-hidden border-[1px] border-solid border-greh" />
//
//                 {/* Buttons and Links */}
//                 <button type="submit" className="absolute top-[35rem] left-[40.5rem] rounded-xl bg-ddcaae shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] w-[44.94rem] h-[2.81rem]"></button>
//                 <div className="absolute top-[35.44rem] left-[57.19rem] font-semibold text-dimgray-300 inline-block w-[17.5rem] h-[3.19rem]">Create Account</div>
//             </form>
//
//             <div className="absolute top-[38.88rem] left-[41.13rem] text-[1.25rem] text-black inline-block w-[21.88rem] h-[2.25rem]">Already have an account?</div>
//             <Link href="/" className="absolute top-[38.81rem] left-[57rem] text-[1.25rem] inline-block font-semibold text-chocolate w-[11.31rem] h-[1.81rem]">Login</Link>
//         </div>
//         </ClientComponent>
//     );
// };
//
// export default CreateAccountPage;
 
