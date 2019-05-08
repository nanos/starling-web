# StarlingWeb

This is a very basic read only web interface for Starling Bank. It lists your accounts and transactions for the accounts. Filtering of transactions is possible by description and amount.

At this time no further options are available.

See [Playing around with Angular and the Starling Bank API](https://blog.msthomas.xyz/playing-around-with-angular-and-the-starling-bank-api/) for more information.

## Configuration

Firstly, supply a file in `src/assets/config.json`. This file must have the following format:

    {
      "api_keys": [
        "Personal access token here",
        "optionally further access tokens"
      ]
    }

You get your personal access tokens at <https://developer.starlingbank.com>.

Why multiple access tokens? Well, I have a personal and a business account with Starling, and you need separate tokens for each.

You will further need to configure proxying for the requests to the starling api. A `proxy.conf.json` sampe file is included in the repository. If you are using IIS you may use the `web.config` to configure proxying. 

## Security considerations

This project was created purely for me to learn a bit about Angular - having never used it before. As such it is definitely not meant to be used for any serious purposes.

One real problem is that the `config.json` not only needs to have the access tokens stored on disk (that's sort of unavoidable, although one coulde store the token in the environment, or takea few other approaches), but that that file gets served to the browser and potentially cached. Also the unencrypted access token gets sent back to the reverse proxy with every request to the Starling server (unless, of course, you configure your server to use HTTPS), so anyone sitting on your network might be able to read it.

As such this project comes with a huge disclaimer: Really don't use it! If you must, then ensure that the access token that you create for this app has only read privilges.