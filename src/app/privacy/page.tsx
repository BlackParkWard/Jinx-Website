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
                <li>We never send your name, photos or location to the AI that suggests questions.</li>
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
                Before a match, your first photo may also be shown, blurred, to people you might be
                matched with in the next two days: up to about 12 people at a time, all of whom fit
                your preferences (and you theirs), never someone you've blocked or who has blocked
                you. It shows nothing else about you, not even your name, and you can't opt out of
                it.
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
                match arrives or it's your turn. Crash reports too, but only if you've chosen to share
                analytics with app developers in iOS Settings. They don't include your messages or
                photos. The app doesn't use an analytics service.
            </p>

            <h2>How we use it</h2>
            <ul>
                <li>To create your profile and show it to the person you're matched with each day.</li>
                <li>To pick your match using your preferences, distance and shared interests.</li>
                <li>
                    To suggest your match ahead of time: we may suggest a pairing up to two days before
                    a drop, from your profile and preferences at that time. We check it again at the
                    drop, so a pairing that no longer fits isn't used, and delete it then.
                </li>
                <li>To suggest questions for you and your match.</li>
                <li>To check photos, answers and messages before anyone else sees them.</li>
                <li>To handle reports, enforce our <a href="/terms">terms</a> and keep Jinx safe.</li>
                <li>To send the notifications you've allowed.</li>
                <li>To show you, once, what happened since you last opened the app.</li>
                <li>
                    To send you one reminder if you miss a couple of matches in a row, using your match
                    history.
                </li>
                <li>
                    To fix and improve the app, using crash reports and your match history (for
                    example, tips in the app, and understanding how active accounts are). This stays
                    with us: the app doesn't use an analytics service.
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
                and your match will both enjoy. Your answers are sent as you wrote them, so anything
                you put in them (a name, say) goes too.
            </p>
            <p>
                <strong>Checking content.</strong> Answers, messages, bios and profile answers are
                checked before they're shown. Each one is sent as you wrote it, so a message with
                contact details in it is sent with them. Each profile photo is also sent once to be
                checked,
                as the image alone with no name or other identifier attached. Some content is
                reviewed by a person on our team, for example when the automated check can't decide
                or when someone reports it.
            </p>
            <p>
                Anthropic processes this data for us under contract and does not use it to train
                its models.
            </p>

            <h2>Who helps us run Jinx</h2>
            <p>We share data only with the services that run Jinx for us:</p>
            <ul>
                <li><strong>Supabase</strong>: our database, file storage and server functions.</li>
                <li><strong>Anthropic</strong>: question suggestions and content checks, as above.</li>
                <li>
                    <strong>Apple</strong>: Sign in with Apple and push notifications, and crash reports
                    if you've chosen to share analytics with app developers in iOS Settings. Apple gives
                    them to us without your name or account.
                </li>
                <li><strong>Vercel</strong>: hosts this website and counts visits to it, as described in "This website".</li>
            </ul>
            <p>
                Some of these providers process data outside the UK. When they do, it's protected by
                approved safeguards such as standard contractual clauses. We may also share
                information if the law requires it, or to protect someone's safety.
            </p>

            <h2>This website</h2>
            <p>
                joinjinx.com is hosted by <strong>Vercel</strong>, which also counts visits to it with
                Vercel Web Analytics. For each page view it records the page and when you viewed it,
                the site that sent you here, your approximate location (country, region and city), and
                your browser, operating system and device type. It uses no cookies. It tells visits
                apart with a scrambled code made from your request, which it discards after 24 hours,
                and it doesn't tie page views to your IP address. We only see totals, never who
                visited, and none of it is linked to a Jinx account. Like any web host, Vercel also
                receives your IP address and browser details when it serves a page, and keeps them
                briefly in its logs to run and protect the site. The app doesn't use it.
            </p>
            <p>
                Under UK data protection law, we rely on our legitimate interest in understanding how
                the site is used to count visits this way, without cookies.
            </p>

            <h2>How long we keep it</h2>
            <p>
                We keep your data while your account is open. When you delete your account, we
                remove your profile, photos, matches, match history, answers and messages. A few things stay, and
                this is why:
            </p>
            <ul>
                <li>
                    Suggested pairings are deleted at the drop, or with your account, and within 7
                    days if a drop fails.
                </li>
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
                    ID once when you delete your account. Our hosting provider deletes them on its own
                    schedule.
                </li>
            </ul>
            <p>
                Safety reports are deleted 1 year after we resolve them. We don't keep backups of
                the database, so deleted data is gone.
            </p>

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
                This is also where to appeal a ban.
            </p>
        </LegalPage>
    );
}
