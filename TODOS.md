# TODOs

## ChatWidget — Retry Logic for Transient API Failures

**What:** Add exponential backoff retry (2 attempts, 1s delay) to `handleSendMessage` in `ChatWidget.tsx`.

**Why:** Currently, a single network blip or server-side 429 shows a permanent error message in chat with no recovery. Retry logic lets the user recover automatically without manual intervention.

**Pros:** User experience on poor connections improves significantly; server-side rate limit errors (429) are handled gracefully with a delay.

**Cons:** Adds ~20 lines of retry logic and a `retryCount` ref. Slightly more complex error handling path.

**Context:** The current error path (ChatWidget.tsx ~line 150) appends a hardcoded error message to chat and does nothing else. Retry should wrap the `fetch()` call, catch recoverable errors (network TypeError, 429, 503), wait 1s, and try once more before showing the error message.

**Depends on / blocked by:** Nothing. Standalone enhancement.
