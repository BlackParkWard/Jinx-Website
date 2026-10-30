// Mirrors docs/legal/privacy-policy.md in BlackParkWard/Jinx. A change to one must be made to the other.
import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, PRIVACY_LAST_UPDATED } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
    "/privacy",
    "Privacy",
    "What Jinx collects, why, who it's shared with, and how to delete it.",
);

export default function Privacy() {
    return (
        <LegalPage
            title="Privacy"
            updated={PRIVACY_LAST_UPDATED}
            intro={
                <p>
                    Jinx shows you one person a day, so it needs to know a little about you. This
                    page explains what we collect, why, who helps us run the app, and how to delete
                    all of it.
                </p>
            }
        >
            <h2>The short version</h2>
            <ul>
                <li>We only collect what the app needs to match you and keep people safe.</li>
                <li>Your location is coarse. A match only ever sees a distance band, never where you are.</li>
                <li>We don't sell your data and there are no ads.</li>
                <li>The AI that suggests questions never sees your name, photos or location.</li>
                <li>Deleting your account in the app removes your profile, photos and conversations.</li>
            </ul>

            <h2>What we collect</h2>
            <p>
                <strong>Your account.</strong> You sign in with Apple. We receive an identifier
                from Apple and, if you share it, an email address. Apple's private relay
                address works fine.
            </p>
            <p>
                <strong>Your profile.</strong> First name, date of birth (to confirm you're 18 or
                over), gender, who you'd like to meet and their age range, photos, an optional bio,
                your answers to three profile prompts, and your interests.
            </p>
            <p>
                <strong>Your location.</strong> A coarse location, your city and your time zone, used
                to find matches within your chosen distance and to deliver your daily match at the
                time you picked.
            </p>
            <p>
                <strong>What happens in the app.</strong> Your daily matches and your Connect or
                Decline choices, the questions you choose, your answers and reactions, chat messages
                once chat is open, and any reports or blocks you make. We also keep a history of
                how your matches turned out for you (a match that wasn't mutual, a connection that
                ended, or a day with no match), with when it happened and when you saw and closed the
                notice about it. It doesn't say who the other person was or why.
            </p>
            <p>
                <strong>Your device.</strong> A push notification token, so we can tell you when your
                match arrives, plus privacy-friendly usage analytics and crash reports that help us
                fix problems.
            </p>

            <h2>How we use it</h2>
            <ul>
                <li>To create your profile and show it to the person you're matched with each day.</li>
                <li>To pick your match using your preferences, distance and shared interests.</li>
                <li>To suggest questions for you and your match.</li>
                <li>To check photos, answers and messages before anyone else sees them.</li>
                <li>To handle reports, enforce our <a href="/terms">terms</a> and keep Jinx safe.</li>
                <li>To send the notifications you've allowed.</li>
                <li>To show you, once, what happened since you last opened the app.</li>
                <li>
                    To understand how the app is used and fix what breaks, including using your match
                    history for tips in the app and to understand how active accounts are.
                </li>
            </ul>
            <p>
                Under UK data protection law, we rely on providing the service you signed up for,
                our legitimate interest in keeping Jinx safe and working, and your consent where we
                ask for it (such as location and notifications). Your consent can be withdrawn at
                any time in your device settings.
            </p>

            <h2>What your match sees</h2>
            <p>
                Your first name, age, approved photos, bio, profile answers, interests and a
                distance band. Never your surname, exact location, email or date of birth. Your
                Connect or Decline choice is never shown. If it isn't mutual, they simply see
                "no spark".
            </p>

            <h2>AI and moderation</h2>
            <p>
                We use Claude, an AI model from Anthropic, in two ways.
            </p>
            <p>
                <strong>Suggesting questions.</strong> We send your interests and profile answers,
                with no name, photos, location or account details, so it can suggest questions you
                and your match will both enjoy.
            </p>
            <p>
                <strong>Checking content.</strong> Answers, messages, bios and profile answers are
                checked before they're shown. Each profile photo is also sent once to be checked,
                as the image alone with no name or other identifier attached. Some content is
                reviewed by a person on our team, for example when the automated check can't decide
                or when someone reports it.
            </p>
            <p>
                Anthropic processes this data for us under contract and does not use it to train
                its models.
            </p>

            <h2>Who helps us run Jinx</h2>
            <p>We share data only with the services that run the app for us:</p>
            <ul>
                <li><strong>Supabase</strong>: our database, file storage and server functions.</li>
                <li><strong>Anthropic</strong>: question suggestions and content checks, as above.</li>
                <li><strong>Apple</strong>: Sign in with Apple and push notifications.</li>
                <li><strong>TelemetryDeck and Sentry</strong>: anonymous usage analytics and crash reports.</li>
            </ul>
            <p>
                Some of these providers process data outside the UK. When they do, it's protected by
                approved safeguards such as standard contractual clauses. We may also share
                information if the law requires it, or to protect someone's safety.
            </p>

            <h2>How long we keep it</h2>
            <p>
                We keep your data while your account is open. When you delete your account, we
                remove your profile, photos, matches, match history, answers and messages. A few things stay, and
                this is why:
            </p>
            <ul>
                <li>
                    Reports you made are kept with your name removed, so we can finish handling them.
                    Reports about you lose your details.
                </li>
                <li>
                    If your account was banned, we keep a one-way scrambled copy of your Apple sign-in
                    identifier so the same account can't sign up again.
                </li>
                <li>
                    Server logs can mention an account when something fails, and record your account
                    ID once when you delete your account. They're deleted on our providers' standard
                    schedules, usually within 30 days.
                </li>
            </ul>

            <h2>Your rights</h2>
            <p>
                You can ask to see, correct, export or delete your data, or object to how we use it.
                Most of this you can do in the app: edit your profile, pause your account, or delete
                it from Profile, Settings. For anything else, email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we'll reply within a month.
            </p>
            <p>
                If you're unhappy with how we've handled your data, you can complain to the
                Information Commissioner's Office at <a href="https://ico.org.uk">ico.org.uk</a>.
            </p>

            <h2>Over 18s only</h2>
            <p>
                Jinx is only for people aged 18 and over. If we learn that someone under 18 has an
                account, we'll delete it.
            </p>

            <h2>Changes</h2>
            <p>
                If we change this policy, we'll update the date at the top. If the change is
                significant, we'll tell you in the app first.
            </p>

            <h2>Contact</h2>
            <p>
                Questions about privacy? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
        </LegalPage>
    );
}
