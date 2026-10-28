# Evaluation — Attempt 1

## Overall Verdict: PASS

## Overall Assessment
The page extends the existing dark cosmic style with an oversized, staggered “HI, I AM RICHELLE” hero and a distinctive hanging ID-card portrait. The requested portfolio structure, dedicated project detail links, CV actions, and a working visual certificate collection are present. The main remaining improvement is making each certificate’s alternative text identify its actual credential rather than only its collection position.

## Scores
| Criterion | Score | Status | Weight | Notes |
|-----------|-------|--------|--------|-------|
| Design Quality | 2/3 | PASS | HIGH | Consistent dark plum/cyan palette, strong display type, and polished document/gallery styling. |
| Originality | 2/3 | PASS | HIGH | The hanging ID-card hero, project-card treatment, and certificate viewer provide deliberate custom character. |
| Craft | 2/3 | PASS | MEDIUM | Layout adapts at 1440px, 768px, and 375px; the certificate gallery loaded all 25 images. Small accessibility/content refinement remains. |
| Functionality | 2/3 | PASS | MEDIUM | Projects route to dedicated detail pages; CV view/download actions and the keyboard-dismissable certificate dialog are implemented. |

## What’s Working Well
- The showcase includes Projects, Certificates, and Tech Stack navigation.
- Six project cards link to `/projects/{slug}` detail pages instead of a preview modal.
- The hero heading exposes “Hi, I am Richelle” as one accessible label while decorative letter spans are hidden from assistive technology; the name has a staggered reveal.
- The CV has separate view and download actions. The gallery presents 25 local certificate images, a visible count, and an enlarged dialog with close, Escape, and previous/next controls.
- The responsive layouts retain the core content and usable two-column certificate gallery on narrow screens.

## Issues Found
### Issue 1: Certificate alternative text is not specific to each credential
- **What**: Every image’s alt text follows the same pattern, “Certificate scan NN from Richelle Mendez’s certificate collection.”
- **Where**: Certificate thumbnails and the enlarged image in `CertificateGallery`.
- **Why it matters**: Screen-reader users cannot distinguish the credentials or understand what each scan represents; the sequential number is only an index.
- **Suggested fix**: Where the source provides it, include the credential name and issuer (and date if legible) in each image’s alt text and visible caption. If a scan is genuinely unreadable, use a concise neutral description rather than inventing details.

## Priority Fixes for Next Attempt
1. Replace numbered generic certificate alt text with accurate credential-specific descriptions and matching captions where possible.

## Should the next attempt REFINE or PIVOT?
REFINE. The visual direction and requested structure are sound; a focused accessibility/content improvement is sufficient.
