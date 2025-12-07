// "use client";

// import { useEffect, useRef, useState } from "react";

// export default function ContactForm() {
//   const formRef = useRef<HTMLFormElement | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

//   useEffect(() => {
//     const fields = document.querySelectorAll(".field");
//     fields.forEach((el) => {
//       el.addEventListener("input", () => {
//         el.classList.toggle(
//           "filled",
//           (el as HTMLInputElement).value.trim() !== ""
//         );
//       });
//     });
//   }, []);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setLoading(true);
//     setStatus("idle");

//     const form = formRef.current;
//     if (!form) return;

//     const data = {
//       firstName: (form.elements.namedItem("fname") as HTMLInputElement).value,
//       lastName: (form.elements.namedItem("lname") as HTMLInputElement).value,
//       email: (form.elements.namedItem("email") as HTMLInputElement).value,
//       message: (form.elements.namedItem("message") as HTMLTextAreaElement)
//         .value,
//     };

//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       if (!res.ok) throw new Error("Failed");

//       setStatus("success");
//       form.reset();
//     } catch {
//       setStatus("error");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <>
//       <section className="min-h-screen flex lg:items-center py-20 sm:py-28 lg:py-40">
//         <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-[220px] px-4 sm:px-8 lg:px-12">
//           {/* LEFT */}
//           <div className="space-y-12">
//             <h2 className="text-3xl sm:text-4xl lg:text-[3.4rem] leading-tight font-semibold max-w-xl">
//               Fill the form.
//               <br />
//               It’s simple.
//             </h2>

//             <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-lg">
//               Whether it’s to discuss a project, explore collaboration, or just
//               talk ideas — this is the fastest way to reach me.
//             </p>

//             <a href="mailto:hello@yourdomain.com" className="email-pill">
//               HELLO@YOURDOMAIN.COM
//             </a>
//           </div>

//           {/* RIGHT */}
//           <div>
//             <form
//               ref={formRef}
//               onSubmit={handleSubmit}
//               className="space-y-10 sm:space-y-12 border-0 lg:border-l border-slate-700/70 p-0 lg:pl-24"
//               noValidate
//             >
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                 <div className="field-wrap">
//                   <input
//                     name="fname"
//                     className="field"
//                     placeholder=" "
//                     required
//                   />
//                   <label className="label">First Name</label>
//                   <span className="baseline" />
//                   <span className="underline" />
//                 </div>

//                 <div className="field-wrap">
//                   <input
//                     name="lname"
//                     className="field"
//                     placeholder=" "
//                     required
//                   />
//                   <label className="label">Last Name</label>
//                   <span className="baseline" />
//                   <span className="underline" />
//                 </div>
//               </div>

//               <div className="field-wrap">
//                 <input
//                   name="email"
//                   type="email"
//                   className="field"
//                   placeholder=" "
//                   required
//                 />
//                 <label className="label">Email</label>
//                 <span className="baseline" />
//                 <span className="underline" />
//               </div>

//               <div className="field-wrap">
//                 <textarea
//                   name="message"
//                   rows={4}
//                   className="field"
//                   placeholder=" "
//                   required
//                 />
//                 <label className="label">Message</label>
//                 <span className="baseline" />
//                 <span className="underline" />
//               </div>

//               <div className="pt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-10">
//                 <button type="submit" className="submit-btn" disabled={loading}>
//                   {loading ? "Sending..." : "Send Message"}
//                 </button>

//                 <span className="text-sm text-slate-400">
//                   I usually reply within 24 hours.
//                 </span>
//               </div>

//               {status === "success" && (
//                 <p className="text-green-400 text-sm">
//                   Message sent successfully.
//                 </p>
//               )}

//               {status === "error" && (
//                 <p className="text-red-400 text-sm">
//                   Something went wrong. Try again.
//                 </p>
//               )}
//             </form>
//           </div>
//         </div>
//       </section>

//       {/* INLINE STYLES (CONTACT FORM ONLY) */}
//       <style jsx>{`
//         :root {
//           --violet-1: #8b5cf6;
//           --aqua-1: #5eead4;
//           --label: #94a3b8;
//         }

//         .field-wrap {
//           position: relative;
//           padding-top: 1.5rem;
//         }

//         .field {
//           width: 100%;
//           background: transparent;
//           border: none;
//           color: #f1f5f9;
//           font-size: 1.05rem;
//           padding: 0.85rem 0;
//           outline: none;
//           caret-color: var(--violet-1);
//         }

//         .baseline {
//           position: absolute;
//           left: 0;
//           right: 0;
//           bottom: 0.6rem;
//           height: 1px;
//           background: white;
//         }

//         .underline {
//           position: absolute;
//           left: 0;
//           bottom: 0.6rem;
//           height: 2px;
//           width: 0%;
//           background: linear-gradient(90deg, var(--violet-1), var(--aqua-1));
//           transition: 0.35s cubic-bezier(0.2, 0.9, 0.2, 1);
//         }

//         .field:focus ~ .underline,
//         .field.filled ~ .underline {
//           width: 100%;
//         }

//         .label {
//           position: absolute;
//           top: 0;
//           left: 0;
//           font-size: 0.6rem;
//           letter-spacing: 0.35em;
//           text-transform: uppercase;
//           color: var(--label);
//           font-weight: 700;
//         }

//         .email-pill {
//           padding: 0.9rem 2.2rem;
//           border: 1px solid rgba(167, 139, 250, 0.45);
//           border-radius: 999px;
//           font-size: 0.7rem;
//           letter-spacing: 0.35em;
//           text-transform: uppercase;
//           color: #c7b6ff;
//           display: inline-block;
//         }

//         .submit-btn {
//           padding: 1rem 3rem;
//           border: 1px solid rgba(148, 163, 184, 0.6);
//           font-size: 0.7rem;
//           letter-spacing: 0.45em;
//           text-transform: uppercase;
//         }
//       `}</style>
//     </>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const fields = document.querySelectorAll(".field");
    fields.forEach((el) => {
      el.addEventListener("input", () => {
        el.classList.toggle(
          "filled",
          (el as HTMLInputElement).value.trim() !== ""
        );
      });
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const form = formRef.current;
    if (!form) return;

    const data = {
      firstName: (form.elements.namedItem("fname") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lname") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      form.reset();

      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="min-h-screen flex lg:items-center py-20 sm:py-28 lg:py-40">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-[220px] px-4 sm:px-8 lg:px-12">
          {/* LEFT */}
          <div className="space-y-12">
            <h2 className="text-3xl sm:text-4xl lg:text-[3.4rem] leading-tight font-semibold max-w-xl">
              Fill the form.
              <br />
              It’s simple.
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-lg">
              Whether it’s to discuss a project, explore collaboration, or just
              talk ideas — this is the fastest way to reach me.
            </p>

            <a href="mailto:info@nordicai.io" className="email-pill">
              INFO@NORDICAI.IO
            </a>
          </div>

          {/* RIGHT */}
          <div>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-10 sm:space-y-12 border-0 lg:border-l border-slate-700/70 p-0 lg:pl-24"
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="field-wrap">
                  <input name="fname" className="field" placeholder=" " />
                  <label className="label">First Name</label>
                  <span className="baseline" />
                  <span className="underline" />
                </div>

                <div className="field-wrap">
                  <input name="lname" className="field" placeholder=" " />
                  <label className="label">Last Name</label>
                  <span className="baseline" />
                  <span className="underline" />
                </div>
              </div>

              <div className="field-wrap">
                <input
                  name="email"
                  type="email"
                  className="field"
                  placeholder=" "
                />
                <label className="label">Email</label>
                <span className="baseline" />
                <span className="underline" />
              </div>

              <div className="field-wrap">
                <textarea
                  name="message"
                  rows={4}
                  className="field"
                  placeholder=" "
                />
                <label className="label">Message</label>
                <span className="baseline" />
                <span className="underline" />
              </div>

              <div className="pt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-10">
                <button
                  type="submit"
                  className={`submit-btn ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                <span className="text-sm text-slate-400">
                  I usually reply within 24 hours.
                </span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* SUCCESS POPUP */}
      {status === "success" && (
        <div className="toast">
          <div className="toast-inner">
            <span>✅ Message sent successfully</span>
            <p>I’ll get back to you shortly.</p>
          </div>
        </div>
      )}

      {/* INLINE STYLES */}
      <style jsx>{`
        :root {
          --violet-1: #8b5cf6;
          --aqua-1: #5eead4;
          --label: #94a3b8;
        }

        .field-wrap {
          position: relative;
          padding-top: 1.5rem;
        }

        .field {
          width: 100%;
          background: transparent;
          border: none;
          color: #f1f5f9;
          font-size: 1.05rem;
          padding: 0.85rem 0;
          outline: none;
          caret-color: var(--violet-1);
        }

        .baseline {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0.6rem;
          height: 1px;
          background: white;
        }

        .underline {
          position: absolute;
          left: 0;
          bottom: 0.6rem;
          height: 2px;
          width: 0%;
          background: linear-gradient(90deg, var(--violet-1), var(--aqua-1));
          transition: 0.35s cubic-bezier(0.2, 0.9, 0.2, 1);
        }

        .field:focus ~ .underline,
        .field.filled ~ .underline {
          width: 100%;
        }

        .label {
          position: absolute;
          top: 0;
          left: 0;
          font-size: 0.6rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--label);
          font-weight: 700;
        }

        .email-pill {
          padding: 0.9rem 2.2rem;
          border: 1px solid rgba(167, 139, 250, 0.45);
          border-radius: 999px;
          font-size: 0.7rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #c7b6ff;
          display: inline-block;
        }

        /* 🔥 SUBMIT BUTTON ANIMATION */
        .submit-btn {
          padding: 1rem 3rem;
          font-size: 0.7rem;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 999px;
          border: none;
          color: #0f172a;
          background: linear-gradient(90deg, var(--violet-1), var(--aqua-1));
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow:
            0 0 25px rgba(94, 234, 212, 0.45),
            0 0 45px rgba(139, 92, 246, 0.35);
        }

        .submit-btn:active {
          transform: scale(0.97);
        }

        .submit-btn.loading {
          opacity: 0.6;
          pointer-events: none;
          animation: pulse 1.3s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(94, 234, 212, 0.5);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(94, 234, 212, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(94, 234, 212, 0);
          }
        }

        /* ✅ SUCCESS TOAST */
        .toast {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 9999;
          animation: slideIn 0.6s ease-out;
        }

        .toast-inner {
          background: linear-gradient(135deg, var(--violet-1), var(--aqua-1));
          color: #0f172a;
          padding: 1.2rem 2rem;
          border-radius: 1rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          font-weight: 600;
        }

        .toast-inner p {
          font-weight: 400;
          font-size: 0.85rem;
          margin-top: 0.4rem;
        }

        @keyframes slideIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
