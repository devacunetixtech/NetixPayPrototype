import React from 'react';
import MyImage from '../assets/logo2.png';
import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom';

const aboutNetix = [
  { name: 'Analytics', description: 'Get Link better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const Navbar = () =>{
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const { user, logoutUser } = useContext(AuthContext);
    return ( 
    <>
      <header className="dark:bg-gray-700">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
                  <div className="flex lg:flex-1">
                  <Link to="/" className="-m-1.5 p-1.5">
                        {/* <span className="sr-only">Your Company</span> */}
                        <img className="h-8 w-auto" src={MyImage} alt="LogoImage"/>
                  </Link>
                  <Link to='/' className="ps-1 text-xl text-white text-center font-bold">NetixPay</Link>
                  </div>
                  <div className="flex lg:hidden">
                        <button type="button"
                              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                              onClick={() => setMobileMenuOpen(true)}>
                              <span className="sr-only">Open main menu</span>
                              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                  </div>
                  <Popover.Group className="hidden lg:flex lg:gap-x-12">
                        {
                              user && (<>
                                    <Link onClick={()=>logoutUser()} to="/login" className="text-sm font-semibold leading-6 text-white">Log Out</Link>
                              </>)
                        }
                        {
                              !user && (<>
                                    <Link to="/login" className="text-sm font-semibold leading-6 text-white">Log In</Link>
                                    <Link to="/register" className="text-sm font-semibold leading-6 text-white">Register</Link>
                              </>)
                        }

                        <Link to="/dashboard" className="text-sm font-semibold leading-6 text-white">Dashboard</Link>

                        <Popover className="relative">
                              <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white ">
                              About Us
                              <ChevronDownIcon className="h-5 w-5 flex-none text-white" aria-hidden="true" />
                              </Popover.Button>

                              <Transition as={Fragment}
                              enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
                              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                              <div className="p-4">
                                    {aboutNetix.map((item) => (
                                    <div key={item.name}
                                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                          </div>
                                          <div className="flex-auto">
                                                <Link to={item.href} className="block font-semibold text-gray-900">
                                                {item.name}
                                                <span className="absolute inset-0" />
                                                </Link>
                                                <p className="mt-1 text-gray-600">{item.description}</p>
                                          </div>
                                    </div>
                                    ))}
                              </div>
                              </Popover.Panel>
                              </Transition>
                        </Popover>
                  </Popover.Group>
                  <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Link to="/profile" className="text-sm font-semibold leading-6 text-white">Profile <span aria-hidden="true">&rarr;</span></Link>
                  </div>
            </nav>
       {/* MOBILE NAVBAR */}
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                  <div className="fixed inset-0 z-10">
                        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                              <Link to="/" className="-m-1.5 p-1.5">
                              <span className="sr-only">Your Company</span>
                              <img className="h-8 w-auto" src={MyImage} alt=""/>
                              </Link>
                              <button type="button"
                              className="-m-2.5 rounded-md p-2.5 text-white" onClick={() => setMobileMenuOpen(false)}>
                              <span className="sr-only">Close menu</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                        </div>
                        <div className="mt-6 flow-root">
                              <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                          {
                                                user && (<>
                                                <Link onClick={()=>logoutUser()} to="/login" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-600">Log Out</Link>
                                                </>)
                                          }
                                          {
                                                !user && (<>
                                                      <Link to="/login"
                                                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-600">Log In</Link>
                                                      <Link to="/register"
                                                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-600">Register</Link>
                                                </>)
                                          }
                                          <Link to="/dashboard"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-600">
                                                Dashboard</Link>
                                          <Link to="/profile"
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-600">
                                                Profile</Link>
                                          <Disclosure as="div" className="-mx-3">
                                                {({ open }) => (
                                                <>
                                                <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-gray-600">About Us
                                                      <ChevronDownIcon className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}       aria-hidden="true"/>
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="mt-2 space-y-2">
                                                      {[...aboutNetix].map((item) => (
                                                      <Disclosure.Button key={item.name}
                                                      as="a" href={item.href}
                                                      className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-white hover:bg-gray-500">
                                                      {item.name}
                                                      </Disclosure.Button>
                                                      ))}
                                                </Disclosure.Panel>
                                                </>
                                                )}
                                          </Disclosure>
                                    </div>
                              </div>
                        </div>
                        </Dialog.Panel>
                  </div>
            </Dialog>
      </header>
    </>
    );
  }
  
  export default Navbar;