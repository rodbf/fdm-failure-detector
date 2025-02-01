# FDM Failure Detector

This script will monitor a local http camera feed and detect printing failures in FDM printers.\
It uses Google's Gemini for image parsing and can send alerts to a Discord webhook.

## Requirements

[Node.js](https://nodejs.org/en) version >= 21.0.0.

A [Moonraker](https://github.com/Arksine/moonraker)-enabled printer.

A valid [Gemini API key](https://ai.google.dev/gemini-api/docs/api-key).

Optional: Discord [webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) and [user ID](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID).

## Usage

Clone the repository and install its dependencies:

```
git clone https://github.com/rodbf/fdm-failure-detector.git
cd fdm-failure-detector
npm install
```

Generate and configure your .env:

```
npm run setup
```

Run the program:

```
npm start
```

## To be implemented

Currently this requires manual restarting when a failure is detected. The next update will include a listener for a Moonraker "started" event notifier to rearm the detector.
