import { NextPage } from "next";
import { Button, Input, Textarea } from "@heroui/react";

const ContactPage: NextPage = () => {
  return (
    <main
      role="main"
      style={{ paddingTop: "var(--nav-h, 5rem)" }}
      className="min-h-screen"
    >
      <section className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="space-y-10">
          {/* Header */}
          <header className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-[#006d63] sm:text-4xl">
              Contact
            </h1>
            <p className="text-muted-foreground">
              Have a question, feedback, or a potential collaboration? Send a
              message and it will be reviewed directly.
            </p>
          </header>

          {/* Contact Info */}
          <div className="border-default-200 space-y-2 rounded-xl border p-6">
            <p className="text-muted-foreground text-sm">Primary contact</p>
            <p className="text-base font-medium">
              Email:{" "}
              <a
                href="mailto:hqq.amrullah@gmail.com"
                className="text-[#006d63] underline"
              >
                hqq.amrullah@gmail.com
              </a>
            </p>
            <p className="text-muted-foreground text-xs">
              Typical response time: 1–2 business days
            </p>
          </div>

          {/* Contact Form */}
          <form
            action="mailto:hqq.amrullah@gmail.com"
            method="POST"
            encType="text/plain"
            className="space-y-5"
          >
            <Input
              label="Name"
              name="name"
              placeholder="Your full name"
              isRequired
            />

            <Input
              type="email"
              label="Email"
              name="email"
              placeholder="you@example.com"
              isRequired
            />

            <Textarea
              label="Message"
              name="message"
              placeholder="Write your message here..."
              minRows={5}
              isRequired
            />

            <Button
              type="submit"
              className="bg-[#006d63] px-6 py-3 font-semibold text-white"
            >
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
