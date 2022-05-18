import { GetStaticProps } from "next";
import React from "react";
import { fetcher } from ".";
import NextLink from "../components/privacy-contact-abous/Link";
import PrivacyContactAboutUsWrapper from "../components/privacy-contact-abous/PageWrapper";
import GRAPHQL_QUERIES from "../services/GraphQLQueries";

function ContactUsPage({ seoData }: { seoData: { [any: string]: any } }) {
  return (
    <PrivacyContactAboutUsWrapper seoData={seoData}>
      <article className="space-y-5 leading-7 mt-8">
        <p>
          Thank you for visiting <NextLink href="/">WrestlingWorld.co</NextLink>. If you have a comment, question or
          correction, please email us at{" "}
          <NextLink href="mailto:theauthority@wrestlingworld.co">theauthority@wrestlingworld.co</NextLink>.
        </p>
        <p>When you contact us, please be sure to include your name and e-mail address so we can get back to you.</p>
      </article>
    </PrivacyContactAboutUsWrapper>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const seoData = await fetcher(GRAPHQL_QUERIES.GET_PAGE_HEAD_SEO("484"));
  return {
    props: { seoData },
  };
};

export default ContactUsPage;
