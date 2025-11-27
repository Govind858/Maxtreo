import { useState } from 'react';
import Footer from '../Footer/Footer';
import ModernNavbar from '../NavBar/NavBar';

export default function PrivacyPolicy() {
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    {
      id: 'personal-data',
      title: 'What Is Personal Data at Maxtreo?',
      content: 'Personal data refers to any information that identifies you as an individual, such as your name, email address, phone number, shipping address, or payment details. At Maxtreo, we collect only the data necessary to provide our services, like processing orders for custom PCs and workstations. We do not collect sensitive information beyond what is required for transactions unless you voluntarily provide it.'
    },
    {
      id: 'privacy-rights',
      title: 'Your Privacy Rights at Maxtreo',
      content: 'You have the right to access, correct, delete, or restrict the use of your personal data. Under Indian laws like the Digital Personal Data Protection Act (DPDP), you can withdraw consent, request data portability, or file complaints with data protection authorities. To exercise these rights, contact us using the details below—we respond within 30 days.'
    },
    {
      id: 'data-collected',
      title: 'Personal Data We Collect from You',
      content: 'When you place an order or create an account, we collect details like your name, contact information, shipping address, and payment data. For custom PC builds, we may gather preferences on components to ensure accurate assembly. Website interactions (e.g., browsing history) are tracked anonymously to improve our site.'
    },
    {
      id: 'data-sources',
      title: 'Personal Data We Receive from Other Sources',
      content: 'We may receive data from payment processors (e.g., Razorpay) or shipping partners (e.g., courier services) to fulfill orders. Third-party analytics tools provide aggregated usage data without personal identifiers. We do not purchase consumer data from external brokers.'
    },
    {
      id: 'data-use',
      title: 'Our Use of Personal Data',
      content: 'We use your data to process orders, ship products, provide customer support, and send promotional emails (with opt-out options). For custom builds, it\'s used for assembly and quality testing. Data helps us improve services, prevent fraud, and comply with legal obligations.'
    },
    {
      id: 'data-sharing',
      title: 'Our Sharing of Personal Data',
      content: 'We share data only with trusted partners like logistics providers for delivery or payment gateways for transactions. We never sell your data. Sharing occurs for legal reasons (e.g., subpoenas) or to protect our rights, always under strict confidentiality agreements.'
    },
    {
      id: 'data-protection',
      title: 'Protection of Personal Data at Maxtreo',
      content: 'We employ industry-standard security measures, including encryption for payment data and secure servers. Access is limited to authorized personnel, and we conduct regular audits. In case of a data breach, we notify affected users and authorities as required by law.'
    },
    {
      id: 'children',
      title: 'Children and Personal Data',
      content: 'Our services are not directed to children under 18. We do not knowingly collect data from minors. If we discover such data, we delete it promptly. Parents/guardians can contact us to review or remove children\'s information.'
    },
    {
      id: 'cookies',
      title: 'Cookies and Other Technologies',
      content: 'We use cookies for site functionality, analytics, and targeted ads. Essential cookies enable shopping carts; others can be managed via browser settings. For details, see our Cookie Policy (linked in footer).'
    },
    {
      id: 'data-transfer',
      title: 'Transfer of Personal Data',
      content: 'As an India-based company, data is primarily stored domestically. International transfers (e.g., to cloud providers) use safeguards like Standard Contractual Clauses to ensure equivalent protection.'
    },
    {
      id: 'commitment',
      title: 'Our Commitment to Your Privacy',
      content: 'Privacy is integral to Maxtreo\'s operations. We minimize data collection, anonymize where possible, and regularly review practices. This policy may update; check back for changes.'
    },
    {
      id: 'questions',
      title: 'Privacy Questions',
      content: (
        <div>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            For questions or to exercise rights, contact:
          </p>
          <ul className="text-base text-gray-700 leading-relaxed space-y-2">
            <li><strong>Email:</strong> maxtreo99@gmail.com</li>
            <li><strong>Phone:</strong> +91 94460 67663</li>
            <li><strong>Address:</strong> Sreevalsam Building, Temple By Pass, Thodupuzha, Near SBI, Kerala, India</li>
          </ul>
        </div>
      )
    }
  ];

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <>
      <ModernNavbar />
      <div className="flex flex-col p-4 lg:p-6 gap-6 max-w-6xl mx-auto bg-white pt-24 pb-12" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-base text-gray-700 max-w-2xl mx-auto mb-6">
            Last updated: November 27, 2025
          </p>
          <p className="text-base text-gray-700 max-w-2xl mx-auto">
            At Maxtreo, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, make a purchase, or interact with our services. We deliver PCs, workstations, and accessories across India and prioritize your data security.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation - List of Sections */}
          <nav className="lg:w-1/4 space-y-1 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4 sr-only">Sections</h2>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => toggleSection(section.id)}
                className={`w-full text-left p-4 border-l-4 border-transparent hover:border-blue-500 focus:outline-none transition-colors ${
                  openSection === section.id ? 'border-blue-500 bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{section.title}</span>
                  <span className={`text-xl transition-transform ${openSection === section.id ? 'rotate-90' : ''}`}>
                    +
                  </span>
                </div>
              </button>
            ))}
          </nav>

          {/* Main Content Area */}
          <div className="lg:w-3/4 space-y-8">
            {sections.map((section) => (
              <div
                key={section.id}
                className={`transition-all duration-300 overflow-hidden ${
                  openSection === section.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pt-4 pb-6 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                  <div className="text-base text-gray-700 leading-relaxed">
                    {typeof section.content === 'string' ? <p>{section.content}</p> : section.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            © 2025 Maxtreo. All rights reserved. <a href="/cookies" className="text-blue-600 hover:underline">Cookie Policy</a> | <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}