import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
  const hiddenTranslateRef = useRef(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");

  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    setProfileMenuOpen(false);
    navigate("/login");
  };

  // Load Google Translate
  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages:
              "en,hi,or,te,mr,kn,ta,ml,bn,sa,gu,pa,as,ur,sd",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "hidden_translate_container"
        );
      };

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }
  }, []);

  // Language change
  const changeLanguage = (lang) => {
    setSelectedLang(lang);
    localStorage.setItem("preferredLang", lang);

    const openMenuAndSelect = () => {
      const iframe = document.querySelector("iframe.goog-te-menu-frame");
      if (!iframe) return setTimeout(openMenuAndSelect, 100);

      const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      if (!innerDoc) return setTimeout(openMenuAndSelect, 100);

      const langAnchor = innerDoc.querySelector(`a[lang='${lang}']`);
      if (langAnchor) {
        langAnchor.click();
      }
    };

    const trigger = document.querySelector(".goog-te-gadget-simple");
    if (trigger) {
      trigger.click();
      setTimeout(openMenuAndSelect, 500);
    }
  };

  // Load saved language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLang") || "en";
    setSelectedLang(savedLang);

    const tryChangeLang = () => {
      if (document.querySelector(".goog-te-gadget-simple")) {
        changeLanguage(savedLang);
      } else {
        setTimeout(tryChangeLang, 200);
      }
    };
    tryChangeLang();
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between text-sm py-4 px-6 mb-5 sticky top-0 z-50 border-b border-gray-200 bg-white/70 backdrop-blur-md shadow-lg rounded-b-[10px]">
      
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer hover:scale-105 transition-transform duration-300"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Menu */}
      <ul className="md:flex items-center gap-8 font-semibold hidden">
        {["/", "/doctors", "/what-docs-say", "/about", "/contact"].map((path, i) => {
          const names = ["HOME", "ALL DOCTORS", "WHAT DOCS SAYING?", "ABOUT", "CONTACT"];
          return (
            <NavLink
              key={i}
              to={path}
              className={({ isActive }) =>
                `relative py-1 transition-all duration-300 ${
                  isActive ? "text-primary scale-105" : "text-gray-800"
                } hover:text-primary hover:scale-110`
              }
            >
              {names[i]}
            </NavLink>
          );
        })}
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Language Dropdown */}
        <select
          value={selectedLang}
          onChange={(e) => changeLanguage(e.target.value)}
          className="hidden md:block border border-gray-300 rounded-lg px-3 py-1 text-gray-700 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="or">ଓଡ଼ିଆ</option>
          <option value="te">తెలుగు</option>
          <option value="mr">मराठी</option>
          <option value="kn">ಕನ್ನಡ</option>
          <option value="ta">தமிழ்</option>
          <option value="ml">മലയാളം</option>
          <option value="bn">বাংলা</option>
          <option value="sa">संस्कृतम्</option>
          <option value="gu">ગુજરાતી</option>
          <option value="pa">ਪੰਜਾਬੀ</option>
          <option value="as">অসমীয়া</option>
          <option value="ur">اردو</option>
          <option value="sd">سنڌي</option>
        </select>

        {/* User or Login */}
        {token && userData ? (
          <div
            className="flex items-center gap-2 cursor-pointer relative"
            ref={profileMenuRef}
          >
            <div
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-2"
            >
              <img
                className="w-9 h-9 rounded-full border border-gray-300"
                src={userData.image}
                alt="User"
              />
              <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
            </div>
            {profileMenuOpen && (
              <div className="absolute top-12 right-0 text-base font-medium text-gray-600 z-20">
                <div className="min-w-48 bg-white rounded-xl shadow-lg flex flex-col gap-4 p-4 border border-gray-200">
                  <p
                    onClick={() => {
                      navigate("/my-profile");
                      setProfileMenuOpen(false);
                    }}
                    className="hover:text-primary cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      navigate("/my-appointments");
                      setProfileMenuOpen(false);
                    }}
                    className="hover:text-primary cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p onClick={logout} className="hover:text-red-500 cursor-pointer">
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-4 md:px-6 py-2 rounded-full font-medium hover:scale-105 transition-transform duration-300"
          >
            Login
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="Menu"
        />

        {/* Mobile Menu */}
        {showMenu && (
          <div
            className="fixed inset-0 z-30 md:hidden flex flex-col transition-all duration-300"
            style={{ background: "transparent" }}
          >
            <div className="flex flex-col h-full" ref={mobileMenuRef}>
              <div className="flex items-center justify-between px-5 py-4 border-b bg-white/90 rounded-b-lg shadow-md">
                <img src={assets.logo} className="w-24" alt="Logo Small" />
                <img
                  onClick={() => setShowMenu(false)}
                  src={assets.cross_icon}
                  className="w-7 cursor-pointer"
                  alt="Close"
                />
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col mt-4">
                {["/", "/doctors", "/what-docs-say", "/about", "/contact"].map((path, i) => {
                  const names = ["HOME", "ALL DOCTORS", "WHAT DOCS SAYING?", "ABOUT", "CONTACT"];
                  return (
                    <NavLink
                      key={i}
                      to={path}
                      onClick={() => setShowMenu(false)}
                      className="mx-5 my-2 px-4 py-3 bg-white/90 rounded-lg shadow hover:bg-primary/10 text-gray-700"
                    >
                      {names[i]}
                    </NavLink>
                  );
                })}
              </div>

              {/* Profile Actions in Mobile */}
              {token ? (
                <div className="mt-auto mb-6">
                  <button
                    onClick={() => {
                      navigate("/my-profile");
                      setShowMenu(false);
                    }}
                    className="mx-5 my-2 w-[calc(100%-2.5rem)] px-4 py-3 bg-white/90 rounded-lg shadow hover:bg-primary/10 text-left text-gray-700"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate("/my-appointments");
                      setShowMenu(false);
                    }}
                    className="mx-5 my-2 w-[calc(100%-2.5rem)] px-4 py-3 bg-white/90 rounded-lg shadow hover:bg-primary/10 text-left text-gray-700"
                  >
                    My Appointments
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setShowMenu(false);
                    }}
                    className="mx-5 my-2 w-[calc(100%-2.5rem)] px-4 py-3 bg-red-50 rounded-lg shadow hover:bg-red-100 text-left text-red-500"
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>

      {/* Hidden Google Translate */}
      <div
        id="hidden_translate_container"
        ref={hiddenTranslateRef}
        style={{ display: "none" }}
      ></div>
    </div>
  );
};

export default Navbar;
