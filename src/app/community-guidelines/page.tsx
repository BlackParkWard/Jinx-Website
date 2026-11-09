// Mirrors docs/legal/community-guidelines.md in BlackParkWard/Jinx. A change to one must be made to the other.
import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, GUIDELINES_LAST_UPDATED } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
    "/community-guidelines",
    "Community guidelines",
    "How we expect people to treat each other on Jinx, and what happens when they don't.",
);

export default function CommunityGuidelines() {
    return (
        <LegalPage
            title="Community guidelines"
            updated={GUIDELINES_LAST_UPDATED}
            intro={
                <p>
                    Jinx works best when everyone feels safe being themselves. These guidelines
                    explain what we expect from each other. They sit alongside our{" "}
                    <a href="/terms">terms</a>, which are the formal version.
                </p>
            }
        >
            <h2>Be yourself</h2>
            <ul>
                <li>You must be 18 or over, and you can't use Jinx if we've banned you before.</li>
                <li>One account per person, and it must be yours. Don't pretend to be someone else.</li>
                <li>Use your real first name and your real age.</li>
                <li>
                    Only use photos of you, where your face is clear, taken recently enough that you'd
                    be recognised. No photos of other people without their consent.
                </li>
                <li>Don't include children anywhere in your photos, even your own.</li>
                <li>No guns or weapons in your photos.</li>
                <li>Answer questions honestly. The point is for someone to get to know the real you.</li>
                <li>Don't put phone numbers, emails, social handles or links in your profile.</li>
            </ul>

            <h2>Be kind</h2>
            <ul>
                <li>Treat your match the way you'd want to be treated.</li>
                <li>
                    Be respectful, even when you're not interested. A match that doesn't go both ways
                    is a normal outcome, not a rejection to argue with.
                </li>
                <li>No harassment, threats, bullying or insults.</li>
                <li>
                    No hate. That includes anything targeting someone's race, ethnicity, religion,
                    disability, gender, sexuality, age or anything else about who they are.
                </li>
                <li>
                    If it isn't working, it's fine to end the connection. You don't owe anyone an
                    explanation, but please don't be cruel.
                </li>
            </ul>

            <h2>Keep it appropriate</h2>
            <ul>
                <li>No nudity or sexually explicit content, in photos, answers or messages.</li>
                <li>No sexual content someone didn't ask for.</li>
                <li>
                    No violent, graphic or illegal content, including promoting violence, self-harm or
                    drugs.
                </li>
                <li>
                    Don't pressure anyone into anything they're not comfortable with, or to move faster
                    than they want.
                </li>
            </ul>

            <h2>Take your time</h2>
            <p>
                Jinx is built around getting to know someone before you chat. Please don't try to
                get around that by sharing phone numbers, social handles or other contact details
                in your answers before chat is open. During question rounds, Jinx blocks phone
                numbers, emails and handles. Share them only when you're both ready, in chat.
            </p>

            <h2>No scams or selling</h2>
            <ul>
                <li>Never ask for or offer money, gifts, financial details or financial help.</li>
                <li>Don't promote a business, product, service, scheme, other apps or accounts.</li>
                <li>No spam, scams, fake profiles or automated accounts.</li>
            </ul>
            <p>
                If someone asks you for money, no matter how good the story, please report them.
            </p>

            <h2>Meeting up</h2>
            <p>
                If you decide to meet, meet somewhere public, tell a friend where you're going, and
                arrange your own way there and back. You can end a connection at any time. Leave if
                you feel uncomfortable. If you're ever in danger, call 999.
            </p>

            <h2>Reporting</h2>
            <p>
                Every match and connection screen has a safety menu: Report, Block and End
                connection. You can use it at any time. Reports are confidential, so the other person
                won't know it was you. We review every report within 24 hours. Blocking someone ends
                any connection with them, and you'll never be matched again.
            </p>

            <h2>What happens if someone breaks these</h2>
            <p>
                Everything is checked before others see it, and we remove anything that breaks
                these guidelines. Depending on what happened, we may warn, suspend or permanently
                ban an account. We report illegal content or threats to the authorities, and
                serious cases, especially anything involving a risk to someone's safety, may be
                passed to the police.
            </p>
            <p>We ban accounts, and may do it without warning, for:</p>
            <ul>
                <li>being under 18;</li>
                <li>fake or impersonated profiles;</li>
                <li>harassment, threats or hate;</li>
                <li>sexual content shared without consent, or anything involving minors;</li>
                <li>scams or asking for money;</li>
                <li>repeated or serious breaks of these guidelines, or getting around a ban.</li>
            </ul>
            <p>
                A banned account leaves any active connection and isn't shown in daily matches. If
                you think we banned you by mistake, email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>

            <h2>Changes</h2>
            <p>
                If we change these guidelines in a way that matters, you'll be asked to accept the
                new version in the app before your next match.
            </p>

            <h2>Contact</h2>
            <p>
                Questions, or something you'd like us to look at? Email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
        </LegalPage>
    );
}
