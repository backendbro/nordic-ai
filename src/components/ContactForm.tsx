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

//       setTimeout(() => setStatus("idle"), 4000);
//     } catch {
//       setStatus("error");
//       setTimeout(() => setStatus("idle"), 4000);
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

//             <a href="mailto:info@nordicai.io" className="email-pill">
//               INFO@NORDICAI.IO
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
//             </form>
//           </div>
//         </div>
//       </section>

//       {/* ✅ FIXED POP-UP ALERTS */}
//       {status === "success" && (
//         <div className="toast toast-success">✔ Message sent successfully</div>
//       )}

//       {status === "error" && (
//         <div className="toast toast-error">✕ Message failed. Try again.</div>
//       )}

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
//           transition: 0.35s ease;
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
//           color: #c7b6ff;
//           display: inline-block;
//         }

//         /* ✅ BUSINESS-SAFE BUTTON */
//         .submit-btn {
//           padding: 1rem 3rem;
//           border-radius: 0;
//           border: 1px solid rgba(148, 163, 184, 0.6);
//           background: transparent;
//           color: #f1f5f9;
//           font-size: 0.7rem;
//           letter-spacing: 0.45em;
//           text-transform: uppercase;
//           cursor: pointer;
//           transition:
//             background 0.25s ease,
//             box-shadow 0.25s ease;
//         }

//         .submit-btn:hover:not(:disabled) {
//           background: linear-gradient(
//             90deg,
//             rgba(139, 92, 246, 0.07),
//             rgba(94, 234, 212, 0.07)
//           );
//           box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
//         }

//         .submit-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         /* ✅ FIXED VISIBLE TOASTS */
//         .toast {
//           position: fixed;
//           bottom: 32px;
//           right: 32px;
//           z-index: 9999;
//           padding: 0.9rem 1.4rem;
//           font-size: 0.85rem;
//           letter-spacing: 0.04em;
//           border-radius: 999px;
//           background: #020617;
//           box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
//           animation: slideIn 0.35s ease;
//         }

//         .toast-success {
//           color: #5eead4;
//           border: 1px solid rgba(94, 234, 212, 0.25);
//         }

//         .toast-error {
//           color: #f87171;
//           border: 1px solid rgba(248, 113, 113, 0.25);
//         }

//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateY(12px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";

type Errors = {
  fname?: string;
  lname?: string;
  email?: string;
  message?: string;
};

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});

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

  function validate(form: HTMLFormElement) {
    const errs: Errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const fname = (form.elements.namedItem("fname") as HTMLInputElement).value;
    const lname = (form.elements.namedItem("lname") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const msg = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;

    if (!fname) errs.fname = "Required";
    if (!lname) errs.lname = "Required";
    if (!emailRegex.test(email)) errs.email = "Invalid email";
    if (msg.length < 5) errs.message = "Too short";

    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");

    const form = formRef.current;
    if (!form) return;

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

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
                  {errors.fname && (
                    <span className="error">{errors.fname}</span>
                  )}
                </div>

                <div className="field-wrap">
                  <input name="lname" className="field" placeholder=" " />
                  <label className="label">Last Name</label>
                  <span className="baseline" />
                  <span className="underline" />
                  {errors.lname && (
                    <span className="error">{errors.lname}</span>
                  )}
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
                {errors.email && <span className="error">{errors.email}</span>}
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
                {errors.message && (
                  <span className="error">{errors.message}</span>
                )}
              </div>

              <div className="pt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-10">
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? <span className="loader" /> : "Send Message"}
                </button>

                <span className="text-sm text-slate-400">
                  I usually reply within 24 hours.
                </span>
              </div>

              {/* FORMAL STATUS MESSAGE */}
              {status === "success" && (
                <p className="status success">
                  ✅ Your message has been sent successfully.
                </p>
              )}

              {status === "error" && (
                <p className="status error">
                  ❌ Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

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
          transition: 0.35s ease;
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

        .error {
          color: #f87171;
          font-size: 0.7rem;
          position: absolute;
          bottom: -1.3rem;
          right: 0;
        }

        .email-pill {
          padding: 0.9rem 2.2rem;
          border: 1px solid rgba(167, 139, 250, 0.45);
          font-size: 0.7rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #c7b6ff;
          display: inline-block;
          cursor: pointer;
        }

        /* REFINED BUSINESS HOVER */
        .submit-btn {
          padding: 1rem 3rem;
          border: 1px solid rgba(148, 163, 184, 0.6);
          font-size: 0.7rem;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          cursor: pointer;
          background: transparent;
          color: white;
          transition:
            background 0.25s ease,
            box-shadow 0.25s ease,
            transform 0.2s ease;
        }

        .submit-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 18px rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loader {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }

        .status {
          font-size: 0.8rem;
          margin-top: 0.5rem;
          animation: fadeIn 0.3s ease;
        }

        .status.success {
          color: #4ade80;
        }

        .status.error {
          color: #f87171;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(3px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
