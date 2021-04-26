import React from "react";
import Navbar from "../components/Navbar";

const Contact: React.FC = () => {
	const submitForm = (e: React.SyntheticEvent) => {
		e.preventDefault();
		e.stopPropagation();

		const target = e.target as typeof e.target & {
			name: { value: string };
			message: { value: string };
		};

		const { name, message } = target;

		sendEmail(name.value, message.value);
	}

	const sendEmail = (name: string, message: string) => {
		location.href = "mailto:anlijudavid@hotmail.com?subject=Allmotored - " + encodeURIComponent(name) + "&body=" + encodeURIComponent(message);
	}

	return (
		<>
			<Navbar selectedIndex={ 2 }/>

			<section className="text-gray-600 body-font relative bg-white">
				<div className="container px-5 py-24 mx-auto">
					<div className="flex flex-col text-center w-full mb-12">
						<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contáctanos</h1>
						<p className="lg:w-2/3 mx-auto leading-relaxed text-base">
							Te ayudamos a resolver las dudas que tengas sobre tu busquedas fácil y rápido a través de nuestro
							formulario.
							<br/>
							¿No encuentras tu motocicleta? Ayudanos a registrarla poniendo los datos en el formulario.
						</p>
					</div>
					<div className="lg:w-1/2 md:w-2/3 mx-auto">
						<form className="flex flex-wrap -m-2" onSubmit={ submitForm }>
							<div className="p-2 w-full sm:w-1/2">
								<div className="relative">
									<label htmlFor="name" className="leading-7 text-sm text-gray-600">Nombre</label>
									<input type="text"
									       id="name"
									       name="name"
									       required
									       maxLength={ 200 }
									       className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									/>
								</div>
							</div>
							<div className="p-2 w-full">
								<div className="relative">
									<label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
									<textarea id="message"
									          name="message"
									          required
									          minLength={ 20 }
									          maxLength={ 500 }
									          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
									          defaultValue={ "" }/>
								</div>
							</div>
							<div className="p-2 w-full">
								<button type='submit'
								        className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
									Enviar
								</button>
							</div>
							<div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
								<p className="leading-normal my-5">
									Julian David M.
									<br/>Colombia
								</p>
								<span className="inline-flex">
                  {/*<a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>*/ }
									<a className="ml-4 text-gray-500" href="https://twitter.com/anlijudavid" rel="noopener noreferrer"
									   target="_blank">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 }
                         className="w-5 h-5" viewBox="0 0 24 24">
                      <path
	                      d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                  </a>
									{/*<a className="ml-4 text-gray-500">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                      <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                    </svg>
                  </a>
                  <a className="ml-4 text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                  </a>*/ }
                </span>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	)
}

export default Contact;