"use client";
import { SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/nextjs";
import { ChevronRightIcon, StarIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
const stats = [
  { label: "Founded", value: "2021" },
  { label: "Employees", value: "5" },
  { label: "Beta Users", value: "521" },
  { label: "Raised", value: "$25M" },
];
const logos = [
  {
    name: "Transistor",
    url: "https://tailwindcss.com/plus-assets/img/logos/transistor-logo-gray-400.svg",
  },
  {
    name: "Mirage",
    url: "https://tailwindcss.com/plus-assets/img/logos/mirage-logo-gray-400.svg",
  },
  {
    name: "Tuple",
    url: "https://tailwindcss.com/plus-assets/img/logos/tuple-logo-gray-400.svg",
  },
  {
    name: "Laravel",
    url: "https://tailwindcss.com/plus-assets/img/logos/laravel-logo-gray-400.svg",
  },
  {
    name: "StaticKit",
    url: "https://tailwindcss.com/plus-assets/img/logos/statickit-logo-gray-400.svg",
  },
  {
    name: "Workcation",
    url: "https://tailwindcss.com/plus-assets/img/logos/workcation-logo-gray-400.svg",
  },
];
const footerNavigation = {
  main: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Accessibility", href: "#" },
    { name: "Partners", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "X",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Dribbble",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  return (
    <div className="bg-white">
      <main>
        {/* Hero section */}
        <div className="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48">
          <div className="mx-auto max-w-md px-6 sm:max-w-3xl lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div>
              <div>
                <img
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=rose&shade=500"
                  className="h-11 w-auto"
                />
              </div>
              <div className="mt-20">
                <div>
                  <a href="#" className="inline-flex space-x-4">
                    <span className="rounded bg-rose-50 px-2.5 py-1 text-sm font-semibold text-rose-500">
                      What's new
                    </span>
                    <span className="inline-flex items-center space-x-1 text-sm font-medium text-rose-500">
                      <span>Just shipped v0.1.0</span>
                      <ChevronRightIcon aria-hidden="true" className="size-5" />
                    </span>
                  </a>
                </div>
                <div className="mt-6 sm:max-w-xl">
                  <h1 className="text-4xl font-bold capitalize tracking-tight text-gray-900 sm:text-5xl">
                    Inventory and quote management for growing teams
                  </h1>
                  <p className="mt-6 text-xl text-gray-500">
                    Built for modern companies to manage inventory and quotes
                    easily.
                  </p>
                </div>
                <SignedOut>
                  <form
                    action="#"
                    className="mt-12 sm:flex sm:w-full sm:max-w-lg"
                  >
                    <div className="min-w-0 flex-1">
                      <label htmlFor="hero-email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="hero-email"
                        type="email"
                        placeholder="Enter your email"
                        className="block w-full rounded-md border border-gray-300 px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                      />
                    </div>
                    <div className="mt-4 sm:ml-3 sm:mt-0">
                      <button
                        type="submit"
                        onClick={() => {
                          router.push("/sign-in");
                        }}
                        className="block w-full rounded-md border border-transparent bg-rose-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:px-10"
                      >
                        Notify me
                      </button>
                    </div>
                  </form>
                </SignedOut>
                <SignedIn>
                  <div className="pt-8 sm:ml-3 sm:mt-0">
                    <p className="text-lg text-gray-500">
                      Signed in as: {user?.emailAddresses[0].emailAddress}
                    </p>
                    <button
                      onClick={() => {
                        router.push("/dashboard");
                      }}
                      className="mt-4 block w-full rounded-md border border-transparent bg-rose-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:px-10"
                    >
                      Go to your dashboard
                    </button>
                    <p className="mt-4 text-center text-gray-500">or</p>
                    <SignOutButton>
                      <button className="mx-auto mt-4 flex justify-center rounded-md border border-gray-300 px-5 py-3 text-base font-medium text-gray-900 shadow-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500">
                        Sign out
                      </button>
                    </SignOutButton>
                  </div>
                </SignedIn>
                <div className="mt-6">
                  <div className="inline-flex items-center divide-x divide-gray-300">
                    <div className="flex shrink-0 pr-5">
                      <StarIcon
                        aria-hidden="true"
                        className="size-5 text-yellow-400"
                      />
                      <StarIcon
                        aria-hidden="true"
                        className="size-5 text-yellow-400"
                      />
                      <StarIcon
                        aria-hidden="true"
                        className="size-5 text-yellow-400"
                      />
                      <StarIcon
                        aria-hidden="true"
                        className="size-5 text-yellow-400"
                      />
                      <StarIcon
                        aria-hidden="true"
                        className="size-5 text-yellow-400"
                      />
                    </div>
                    <div className="min-w-0 flex-1 py-1 pl-5 text-sm text-gray-500 sm:py-3">
                      <span className="font-medium text-gray-900">
                        Rated 5 stars
                      </span>{" "}
                      by over{" "}
                      <span className="font-medium text-rose-500">
                        500 beta users
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
            <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <div className="hidden sm:block">
                <div className="absolute inset-y-0 left-1/2 w-screen rounded-l-3xl bg-gray-50 lg:left-80 lg:right-0 lg:w-full" />
                <svg
                  fill="none"
                  width={404}
                  height={392}
                  viewBox="0 0 404 392"
                  className="absolute right-1/2 top-8 -mr-3 lg:left-0 lg:m-0"
                >
                  <defs>
                    <pattern
                      x={0}
                      y={0}
                      id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x={0}
                        y={0}
                        fill="currentColor"
                        width={4}
                        height={4}
                        className="text-gray-200"
                      />
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                    width={404}
                    height={392}
                  />
                </svg>
              </div>
              <div className="relative -mr-40 pl-6 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/task-app-rose.jpg"
                  className="w-full rounded-md shadow-xl ring-1 ring-black/5 lg:h-full lg:w-auto lg:max-w-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial/stats section */}
        <div className="relative mt-20">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:items-start lg:gap-24 lg:px-8">
            <div className="relative sm:py-16 lg:py-0">
              <div
                aria-hidden="true"
                className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
              >
                <div className="absolute inset-y-0 right-1/2 w-full rounded-r-3xl bg-gray-50 lg:right-72" />
                <svg
                  fill="none"
                  width={404}
                  height={392}
                  viewBox="0 0 404 392"
                  className="absolute left-1/2 top-8 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
                >
                  <defs>
                    <pattern
                      x={0}
                      y={0}
                      id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x={0}
                        y={0}
                        fill="currentColor"
                        width={4}
                        height={4}
                        className="text-gray-200"
                      />
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"
                    width={404}
                    height={392}
                  />
                </svg>
              </div>
              <div className="relative mx-auto max-w-md px-6 sm:max-w-3xl lg:max-w-none lg:px-0 lg:py-20">
                {/* Testimonial card*/}
                <div className="relative overflow-hidden rounded-2xl pb-10 pt-64 shadow-xl">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1521510895919-46920266ddb3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&fp-x=0.5&fp-y=0.6&fp-z=3&width=1440&height=1440&sat=-100"
                    className="absolute inset-0 size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-rose-500 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-600 via-rose-600 opacity-90" />
                  <div className="relative px-8">
                    <div>
                      <img
                        alt="Workcation"
                        src="https://tailwindcss.com/plus-assets/img/logos/workcation.svg?color=white"
                        className="h-12"
                      />
                    </div>
                    <blockquote className="mt-8">
                      <div className="relative text-lg font-medium text-white md:grow">
                        <svg
                          fill="currentColor"
                          viewBox="0 0 32 32"
                          aria-hidden="true"
                          className="absolute left-0 top-0 size-8 -translate-x-3 -translate-y-2 transform text-rose-400"
                        >
                          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                        </svg>
                        <p className="relative">
                          Tincidunt integer commodo, cursus etiam aliquam neque,
                          et. Consectetur pretium in volutpat, diam. Montes,
                          magna cursus nulla feugiat dignissim id lobortis amet.
                        </p>
                      </div>

                      <footer className="mt-4">
                        <p className="text-base font-semibold text-rose-200">
                          Sarah Williams, CEO at Workcation
                        </p>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mx-auto max-w-md px-6 sm:max-w-3xl lg:px-0">
              {/* Content area */}
              <div className="pt-12 sm:pt-16 lg:pt-20">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  On a mission to empower teams
                </h2>
                <div className="mt-6 space-y-6 text-gray-500">
                  <p className="text-lg">
                    Sagittis scelerisque nulla cursus in enim consectetur quam.
                    Dictum urna sed consectetur neque tristique pellentesque.
                    Blandit amet, sed aenean erat arcu morbi. Cursus faucibus
                    nunc nisl netus morbi vel porttitor vitae ut. Amet vitae
                    fames senectus vitae.
                  </p>
                  <p className="text-base/7">
                    Sollicitudin tristique eros erat odio sed vitae, consequat
                    turpis elementum. Lorem nibh vel, eget pretium arcu vitae.
                    Eros eu viverra donec ut volutpat donec laoreet quam urna.
                    Sollicitudin tristique eros erat odio sed vitae, consequat
                    turpis elementum. Lorem nibh vel, eget pretium arcu vitae.
                    Eros eu viverra donec ut volutpat donec laoreet quam urna.
                  </p>
                  <p className="text-base/7">
                    Rhoncus nisl, libero egestas diam fermentum dui. At quis
                    tincidunt vel ultricies. Vulputate aliquet velit faucibus
                    semper. Pellentesque in venenatis vestibulum consectetur
                    nibh id. In id ut tempus egestas. Enim sit aliquam nec, a.
                    Morbi enim fermentum lacus in. Viverra.
                  </p>
                </div>
              </div>

              {/* Stats section */}
              <div className="mt-10">
                <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="border-t-2 border-gray-100 pt-6"
                    >
                      <dt className="text-base font-medium text-gray-500">
                        {stat.label}
                      </dt>
                      <dd className="text-3xl font-bold tracking-tight text-gray-900">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-10">
                  <a href="#" className="text-base font-medium text-rose-500">
                    Learn more about how we're changing the world &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo cloud section */}
        <div className="mt-32">
          <div className="mx-auto max-w-md px-6 sm:max-w-3xl lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-24">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Backed by world-renowned investors
                </h2>
                <p className="mt-6 max-w-3xl text-lg text-gray-500">
                  Sagittis scelerisque nulla cursus in enim consectetur quam.
                  Dictum urna sed consectetur neque tristique pellentesque.
                  Blandit amet, sed aenean erat arcu morbi. Cursus faucibus nunc
                  nisl netus morbi vel porttitor vitae ut. Amet vitae fames
                  senectus vitae.
                </p>
                <div className="mt-6">
                  <a href="#" className="text-base font-medium text-rose-500">
                    Meet our investors and advisors &rarr;
                  </a>
                </div>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
                {logos.map((logo) => (
                  <div
                    key={logo.name}
                    className="col-span-1 flex justify-center bg-gray-50 px-8 py-8"
                  >
                    <img alt={logo.name} src={logo.url} className="max-h-12" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="relative mt-24 sm:mt-32 sm:py-16">
          <div aria-hidden="true" className="hidden sm:block">
            <div className="absolute inset-y-0 left-0 w-1/2 rounded-r-3xl bg-gray-50" />
            <svg
              fill="none"
              width={404}
              height={392}
              viewBox="0 0 404 392"
              className="absolute left-1/2 top-8 -ml-3"
            >
              <defs>
                <pattern
                  x={0}
                  y={0}
                  id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    fill="currentColor"
                    width={4}
                    height={4}
                    className="text-gray-200"
                  />
                </pattern>
              </defs>
              <rect
                fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"
                width={404}
                height={392}
              />
            </svg>
          </div>
          <div className="mx-auto max-w-md px-6 sm:max-w-3xl lg:max-w-7xl lg:px-8">
            <div className="relative overflow-hidden rounded-2xl bg-rose-500 px-6 py-10 shadow-xl sm:px-12 sm:py-20">
              <div
                aria-hidden="true"
                className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
              >
                <svg
                  fill="none"
                  viewBox="0 0 1463 360"
                  preserveAspectRatio="xMidYMid slice"
                  className="absolute inset-0 size-full"
                >
                  <path
                    d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                    fill="currentColor"
                    className="text-rose-400/40"
                  />
                  <path
                    d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                    fill="currentColor"
                    className="text-rose-600/40"
                  />
                </svg>
              </div>
              <div className="relative">
                <div className="sm:text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Get notified when we&rsquo;re launching.
                  </h2>
                  <p className="mx-auto mt-6 max-w-2xl text-lg text-rose-100">
                    Sagittis scelerisque nulla cursus in enim consectetur quam.
                    Dictum urna sed consectetur neque tristique pellentesque.
                  </p>
                </div>
                <form
                  action="#"
                  className="mt-12 sm:mx-auto sm:flex sm:max-w-lg"
                >
                  <div className="min-w-0 flex-1">
                    <label htmlFor="cta-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="cta-email"
                      type="email"
                      placeholder="Enter your email"
                      className="block w-full rounded-md border border-transparent px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500"
                    />
                  </div>
                  <div className="mt-4 sm:ml-3 sm:mt-0">
                    <button
                      type="submit"
                      className="block w-full rounded-md border border-transparent bg-gray-900 px-5 py-3 text-base font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500 sm:px-10"
                    >
                      Notify me
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer section */}
      <footer className="mt-24 bg-gray-900 sm:mt-12">
        <div className="mx-auto max-w-md overflow-hidden px-6 py-12 sm:max-w-3xl lg:max-w-7xl lg:px-8">
          <nav
            aria-label="Footer"
            className="-mx-5 -my-2 flex flex-wrap justify-center"
          >
            {footerNavigation.main.map((item) => (
              <div key={item.name} className="px-5 py-2">
                <a
                  href={item.href}
                  className="text-base text-gray-400 hover:text-gray-300"
                >
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
          <div className="mt-8 flex justify-center space-x-6">
            {footerNavigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-300"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2020 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
