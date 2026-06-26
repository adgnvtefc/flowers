// Patch notes — a dict of every update, newest first.
//
// To ship a new one: add an entry at the TOP of `versions` and point `latest`
// at its key. The newest note pops up when the site is opened (once per version,
// so it isn't naggy); all of them stay here and are viewable under "older updates".
const PATCH_NOTES = {
    "latest": "v3",
    "versions": {
        "v3": {
            "date": "June 25, 2026",
            "title": "interactivity yayyy",
            "changes": [
                "click on the new button in the new memories pages where you left the comments yesterday :D",
            ]
        },
        "v2": {
            "date": "June 24, 2026",
            "title": "I LOVE YOU",
            "changes": [
                "see snap memories hehe",
            ]
        },
        "v1": {
            "date": "June 17, 2026",
            "title": "HELLOOO",
            "changes": [
                "small formatting improvements on the memories page is all i could do today sorry"
            ]
        },
    }
};
