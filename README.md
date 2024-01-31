# Angular Spotify

A simple Spotify client built with Angular 15, Nx workspace, ngrx, TailwindCSS and ng-zorro.

> I have recently shared about #angularspotify at [AngularAir](https://angularair.com), you can watch the session here 👉 [youtu.be/uPB0KHKlrU8][02-air]

## Working application

![Angular Spotify Demo][demo]

![Angular Spotify Visualizer][visualizer]

![Angular Spotify Browse][angular-spotify-browse]

![Angular Spotify Blurry Background][album-art]

![Angular Spotify PWA][pwa]

![Angular Spotify Web Player][web-player]

## Who is it for 🤷‍♀️

I still remember Window Media Player on windows has the visualization when you start to play the music, and I wanted to have the same experience when listening to Spotify. That is the reason I started this project.

I found that there weren't many resources on building a proper real-world scale application, and that's my focus for sharing. I made a [Jira clone application][jira] as the first one for that purpose. [Nx workspace][nx] is getting more and more attention from the Angular community, but people are always confused about how to architect and set up an Nx project. I hope Angular Spotify will give you more insight on that even though it is my first project using Nx 🤣

---

You know I am one of the moderators of [Angular Vietnam][angularvn]. Recently, I also started [Angular Singapore][angularsg]. This piece of work is my other long-term plan to bring Angular knowledge to more people. I desire to advocate and grow the Angular developer community in Singapore and Vietnam :)

## Tech stack

![Tech logos][stack]

- [Angular 15][angular]
- [Nx Workspace][nx]
- [ngneat][] packages includes: `ngneat/svg-icon` and `ngneat/until-destroy`
- [ngrx][ngrx] and [ngrx/component-store][component-store]
- [ng-zorro][ng-zorro] UI component: `tooltip`, `modal`, `slider`, `switch` and more.
- [TailwindCSS][tailwind] - See this video [Everything you need to know about TailwindCSS and Angular applications](https://youtu.be/zSXdJqEPy9w) by [@nartc][nartc] for integration TailwindCSS with Angular
- [Netlify][netlify] for deployment

[angular]: https://angular.io/
[ngrx]: https://ngrx.io/
[component-store]: https://ngrx.io/guide/component-store
[tailwind]: https://tailwindcss.com/
[ng-zorro]: https://ng.ant.design/docs/introduce/en
[netlify]: http://netlify.com/
[ngneat]: https://github.com/ngneat

I experimented with the ngrx/component store for `AuthStore` and `UIStore`. It might not be a best practice, and I will refactor it very soon. Just FYI 🤣

## High-level design

See my original notes on [Nx workspace structure for NestJS and Angular][gist]

### Principles

All components are following:

- OnPush Change Detection and async pipes: all components use observable and async pipe for rendering data without any single manual subscribe. Only some places are calling subscribe for dispatching an action, which I will have a refactor live stream session with my friend [@nartc][nartc] to use the component store for a fully subscribe-less application.
- SCAMs (single component Angular modules) for tree-shakable components, meaning each component will have a respective module. For example, a RegisterComponent will have a corresponding RegisterModule. We won't declare RegisterComponent as part of AuthModule, for instance.
- Mostly, everything will stay in the `libs` folder. New modules, new models, new configurations, new components etc... are in libs. libs should be separated into different directories based on existing apps. We won't put them inside the apps folder. For example in an Angular, contains the `main.ts`, `app.component.ts` and `app.module.ts`

### Structure

I followed the structure recommended by my friend [@nartc][nartc]. Below is the simplified version of the application structure.

```
.
└── root
    ├── apps
    │   └── angular-spotify
    └── libs
        └── web (dir)
            ├── shell (dir)
            │   ├── feature (angular:lib) - for configure any forRoot modules
            │   └── ui
            │       └── layout (angular:lib)
            ├── settings (dir)
            │   ├── feature (angular:lib) - for configure and persist all settings
            │   └── data-access (workspace:lib) - store and services for settings module
            ├── playlist (dir)
            │   ├── data-access (angular:lib, service, state management)
            │   ├── features
            │   │   ├── list (angular:lib PlaylistsComponent)
            │   │   └── detail (angular:lib PlaylistDetailComopnent)
            │   └── ui (dir)
            │       └── playlist-track (angular:lib, SCAM for Component)
            ├── visualizer (dir)
            │   ├── data-access (angular:lib)
            │   ├── feature
            │   └── ui (angular:lib)
            ├── home (dir)
            │   ├── data-access (angular:lib)
            │   ├── feature (angular:lib)
            │   └── ui (dir)
            │       ├── featured-playlists (angular:lib, SCAM for Component)
            │       ├── greeting (angular:lib, SCAM for Component)
            │       └── recent-played (angular:lib, SCAM for Component)
            └── shared (dir)
                ├── app-config (injection token for environment)
                ├── data-access (angular:lib, API call, Service or State management to share across the Client app)
                ├── ui (dir)
                ├── pipes (dir)
                ├── directives (dir)
                └── utils (angular:lib, usually shared Guards, Interceptors, Validators...)
```

### Authentication Flow

I follow `Implicit Grant Flow` that Spotify recommended for client-side only applications and did not involve secret keys. The issued access tokens are short-lived, and there are no refresh tokens to extend them when they expire.

View the [Spotify Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/)

- Upon opening Angular Spotify, It will redirect you to Spotify to get access to your data. Angular Spotify only uses the data purely for displaying on the UI. We won't store your information anywhere else.
- Angular Spotify only keeps the access token in the browser memory without even storing it into browser local storage. If you do a hard refresh on the browser, It will ask for a new access token from Spotify. One access token is only valid for **one hour**.
- After having the token, I'll try to connect to the Web Playback SDK with a new player - `Angular Spotify Web Player`

![Angular Spotify Web Playback SDK flow][sdk-flow]

### Dependency Graph

Nx provides an [dependency graph][dep-graph-nx] out of the box. To view it on your browser, clone my repository and run:

```bash
npm run dep-graph
```

A simplified graph looks like the following. It gives you insightful information for your mono repo and is especially helpful when multiple projects depend on each other.

![Angular Spotify Dependency Graph][dep-graph]

### Nx Computation Cache

Having Nx Cloud configured shortens the deployment time quite a lot.

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly. Visit [Nx Cloud](https://nx.app/) to learn more.

![Nx cloud][nx-cloud]

## Features and Roadmap

I set a tentative deadline for motivating myself to finish the work on time. Otherwise, It will take forever to complete :)

- [x] Proven, scalable, and easy to understand the structure with Nx workspace
- [x] Play music using Spotify SDK
- [x] Load a maximum of 50 save playlists and top 100 songs per playlist.
- [x] Cool visualization

## License

[MIT](https://opensource.org/licenses/MIT)

[issues]: https://github.com/trungk18/angular-spotify/issues/new
[pull]: https://github.com/trungk18/angular-spotify/compare
[jira]: https://jira.trungk18.com/
[twitter]: https://twitter.com/trungvose
[nx]: https://nx.dev/
[angularsg]: https://twitter.com/angularsg
[angularvn]: https://twitter.com/ngvnofficial
[nartc]: https://github.com/nartc
[gist]: https://gist.github.com/trungk18/7ef8766cafc05bc8fd87be22de6c5b12
[dep-graph-nx]: https://nx.dev/latest/angular/structure/dependency-graph
[stack]: /libs/web/shared/assets/src/assets/readme/angular-spotify-tech-stack.png
[time]: /libs/web/shared/assets/src/assets/readme/time-spending.png
[dep-graph]: /libs/web/shared/assets/src/assets/readme/dep-graph.png
[sdk-flow]: /libs/web/shared/assets/src/assets/readme/sdk-flow.png
[demo]: /libs/web/shared/assets/src/assets/readme/angular-spotify-demo-short.gif
[visualizer]: /libs/web/shared/assets/src/assets/readme/angular-spotify-visualization.gif
[angular-spotify-browse]: /libs/web/shared/assets/src/assets/readme/angular-spotify-browse.gif
[album-art]: /libs/web/shared/assets/src/assets/readme/angular-spotify-album-art.gif
[pwa]: /libs/web/shared/assets/src/assets/readme/angular-spotify-pwa.gif
[web-player]: /libs/web/shared/assets/src/assets/readme/angular-spotify-web-player.png
[nx-cloud]: /libs/web/shared/assets/src/assets/readme/nx-cloud.png
