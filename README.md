AudioAlerts.io Browser Agent
===============

The browser agent for triggering dings, cheers, chimes, and bings. 
Don't spend time looking at dashboard when you can be audibly notified.


You'll need a AudioAlerts.io account to use this agent. If you don't have one, [why not
start a free trial today?](https://audioalerts.io/pricing)

## Quick Start

1. [Signup for AudioAlerts](https://audioalerts.io/pricing) and get your token.
2. Add a dependency on AudioAlerts with `npm install audioalerts --save`
3. Install the agent in your app. You can paste the script tags into the
`<head>` of your HTML:

```html
<script src="PATH_TO_AUDIOALERTS/audioalerts.js"></script>
<script>
  window.AudioAlerts && AudioAlerts.install({ accountId: 'YOUR_ACCOUNT_ID', siteId: 'YOUR_SITE_ID' });
</script>
```

Or you can bundle it as a module into your application.

```javascript
import { AudioAlerts } from 'audioalerts';
AudioAlerts.install({ accountId: 'YOUR_ACCOUNT_ID', siteId: 'YOUR_SITE_ID' });
```

4. Test it out by calling `AudioAlerts.track()` somewhere in your
application.
5. You should hear an alert on [AudioAlerts](https://audioalerts.io/) instantaneously.


## More Information

You can find more information about how to install and configure the agent in
the [AudioAlerts.io Documentation](https://docs.audioalerts.io/docs). If you run into any
trouble, let us know right away at `support@audioalerts.io`


