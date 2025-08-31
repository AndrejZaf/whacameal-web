const PrivacyPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-6">
        <strong>Last Updated:</strong> [Insert Date]
      </p>
      <p className="mb-8">
        Your privacy is important to me. This Privacy Policy explains how I
        collect, use, and protect any personal information you provide while
        using <strong>[Your Name / Portfolio Website Name]</strong>.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Information I Collect</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Personal Information:</strong> If you contact me through
            forms or email, you may provide your name, email address, or other
            details.
          </li>
          <li>
            <strong>Non-Personal Information:</strong> Basic usage data may be
            collected automatically (e.g., browser type, device, IP address,
            pages visited) through analytics tools.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          2. How I Use Your Information
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            To respond to inquiries or messages you send through the contact
            form or email.
          </li>
          <li>
            To improve the website and understand how visitors interact with it.
          </li>
          <li>To ensure the website is secure and functions correctly.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          3. Sharing of Information
        </h2>
        <p>
          I do not sell, rent, or trade your personal information. Information
          may only be disclosed if required by law or to protect my legal
          rights.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Cookies and Analytics</h2>
        <p>
          This website may use cookies and third-party analytics (e.g., Google
          Analytics) to track usage and improve performance. You can disable
          cookies in your browser settings if you prefer.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
        <p>
          I take reasonable measures to protect your personal information, but I
          cannot guarantee complete security due to the nature of the internet.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal
          data at any time by contacting me directly.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          7. Changes to This Policy
        </h2>
        <p>
          I may update this Privacy Policy from time to time. Any changes will
          be reflected on this page with an updated date.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">8. Contact</h2>
        <p>
          If you have any questions about this Privacy Policy, you can contact
          me at:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>
            <strong>Email:</strong> [your email]
          </li>
          <li>
            <strong>Website:</strong> [your portfolio URL]
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPage;
