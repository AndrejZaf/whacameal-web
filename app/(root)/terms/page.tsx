const TermsPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">
        Terms and Conditions
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        <strong>Last Updated:</strong> [Insert Date]
      </p>
      <p className="mb-8">
        Welcome to <strong>[Your Name / Portfolio Website Name]</strong>. By
        accessing or using this website, you agree to be bound by these Terms
        and Conditions. If you do not agree, please do not use this website.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Use of the Website</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            This website is intended for showcasing my personal work, projects,
            and professional experience.
          </li>
          <li>
            You agree to use the website only for lawful purposes and not to
            engage in any activity that could harm, disable, or impair the
            website.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Intellectual Property</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            All content on this website (including text, images, code snippets,
            designs, and projects) is owned by me, unless otherwise stated.
          </li>
          <li>
            You may view, download, or share links to the content for personal
            and non-commercial purposes only.
          </li>
          <li>
            Unauthorized reproduction, redistribution, or modification of the
            content is prohibited.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Third-Party Links</h2>
        <p>
          This website may contain links to third-party websites or resources. I
          am not responsible for the content, availability, or accuracy of these
          external sites.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Disclaimer</h2>
        <p>
          The content on this website is provided for informational purposes
          only. While I strive for accuracy, I make no guarantees about the
          completeness, reliability, or suitability of the information. Any
          reliance you place on the content is strictly at your own risk.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          5. Limitation of Liability
        </h2>
        <p>
          I am not liable for any loss, damage, or inconvenience caused by the
          use of this website or reliance on its content.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Privacy</h2>
        <p>
          This website may collect minimal data (e.g., via contact forms or
          analytics). Any personal information provided will not be shared with
          third parties without consent, except as required by law.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Changes to Terms</h2>
        <p>
          I reserve the right to update or modify these Terms and Conditions at
          any time without prior notice. Continued use of the website after
          changes indicates your acceptance of the updated Terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed under the laws of
          [Insert Your Country].
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">9. Contact</h2>
        <p>
          If you have any questions about these Terms, you can contact me at:
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

export default TermsPage;
