# How can I contribute?

- You can fix the typos (if any) in any documentation of this repo.
- You can check for any **unassigned** [issues](https://github.com/Real-Dev-Squad/website-www/issues) and **comment** on that issue that you'd like to get that assigned to you. (Remember: Do not work on issues assigned to someone else and do not work on any issue without having it assigned to you.)
- Create issue if you see any bug and then once you get approved from the admins, you can assign yourself and start working on it.

# How can you make a **Pull Request** (PR)

**Note**: Steps 1, 2 and 3 are **one-time** steps required for setup. If you have already cloned the repo and added upstream, consider following this documentation from step 4.

1. **Forking repository**

Fork this repository using the **Fork** option at the top-right corner of this page. This will create your own copy of this repository. You'll be redirected to your forked repository. Copy the link of this repository (which will look like `https://github.com/<your-username>/website-www/`) as you'll need it in the step 2.

![how-to-fork](https://user-images.githubusercontent.com/53713926/212554906-0308d029-7cf6-4403-8f7b-0ca4d50de46f.png)

2. **Cloning repository and Installing packages**

Clone your forked repository, this will download your copy of repository in your computer. To do this, open your terminal (command prompt/bash/git bash) and enter the following command, paste your link after the word **clone** without the **<>**.

```
git clone <link which you copied in the step 1>
```

Once you have cloned the repository, now you should go into the folder containing the repository. You can do that with:

```
cd website-www
```

Now since we are migrating this project from `Vanilla JS` to `emberJS` we had to run the following command to switch to the `ember` branch to install the required packages.

```

git checkout develop-ember

```

Now you should install the required packages to run this project by doing:

```

yarn or yarn install

```

3. **Adding remote repository**

Add the Real Dev Squad repository as a remote repository, so that you can anytime pull the latest changes from the Real Dev Squad repository which is being deployed. This needs to be done only for the first time.

```

git remote add upstream https://github.com/Real-Dev-Squad/website-www/

```

4. **Getting the latest code from the develop-ember branch** (Can be skipped if you've cloned the repo just now)

If it's been quite a while after you have cloned the repo/made the last pull request, it's recommended to take a pull from the develop-ember branch after swithcing to `develop-ember` by command `git checkout develop-ember`. Reason being, there may be some changes which could have merged after you had cloned the repo/made the last pull request.

To do so, make sure you're in the develop-ember branch by checking out to the **develop-ember** branch:

```

git checkout develop-ember

```

Once you're in the **develop-ember** branch, it's time to take a pull:

```

git pull upstream develop-ember

```

Now that you've made sure that you've got latest changes, we can proceed to creating our branch

5. **Setting Up the site locally**

We can change the build command in scripts in package.json file to

`ember s --environment=staging`

Or

We can setup backend in our local system

Or

In the environment.js in the config folder,change the development base api url to staging api url i.e `https://staging-api.realdevsquad.com`

Hit this url `https://staging-api.realdevsquad.com/auth/github/login` to set the session cookie.

As we are using staging-api we have to signup on this url `https://staging-my.realdevsquad/new-signup`

#### Security

The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin. It helps isolate potentially malicious documents, reducing possible attack vectors.

Check out this [MDN link](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) to understand what constitutes as Same Origin

We only allow `*.realdevsquad.com` to access our backend APIs via [Access-Control-Allow-Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin)

When calling our APIs, our cookies are ensured to be restricted for access (Read why [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies))

- HttpOnly
- Secure

#### Expected problem

During frontend development, when you run a local dev server, it will run on `http://localhost:<some-port>`, e.g `http://localhost:4200`

This `localhost` server, you will **NOT** be able to use our backend APIs directly from the browser, because the cookies will not be sent by the browser according to the origins not matching because:

- **http** : Cookie is meant to be for secure `https`
- **localhost** : Domain doesn't match `*.realdevsquad.com`
- **port** : Should be default `443` for https (or 80 for http)

#### Solution

If we want to make calls to our APIs beloging to \*.realdevsquad.com, then we need to be originating those requests from the same origin.

We also need to run our local development server on a url that is serving over **https** so that our prod/staging _secure_ cookies can be sent in our requests originating form the browser, automatically as expected.

We basically need this kind of traffic redirection:

> https://dev.realdevsquad.com -> http://localhost:`<some-port>`

#### 1. 🔗 DNS

We need to resolve `dev.realdevsquad.com` to `localhost`.

We do that by adding the entry `127.0.0.1 dev.realdevsquad.com` to our `/etc/hosts` file on our local computer.

Now, if you go to `dev.realdevsquad.com` on your browser, the OS will automatically resolve it to `localhost`.
If you go to `dev.realdevsquad.com:4200`, it will point to `localhost:4200` and show you your running app. (if you have a dev server running on port 4200)

(Read more [here](https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/) and [here](https://tldp.org/LDP/solrhe/Securing-Optimizing-Linux-RH-Edition-v1.3/chap9sec95.html))

#### 2. 🔐 HTTPS

We have to ensure that we can now visit `https://dev.realdevsquad.com` (which by default is port 443).

Opening this now will show you a problem of your TLS/SSL certificate. This is a security feature of the browser to ensure that your site is legit.

We need to setup a **reverse proxy**(highly encourage you to read about it [here](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/)), that runs directs our traffic to port 443 to our dev server

A possible solution is installing [local-ssl-proxy](https://www.npmjs.com/package/local-ssl-proxy).

Install the local-ssl-proxy using `npm i -g local-ssl-proxy`

This is a simple solution of running a simple SSL HTTP proxy using a self-signed certificate.(Intended for local development only)

Run `local-ssl-proxy --source 443 --target 4200`

Now if you visit https://dev.realdevsquad.com on your browser, expect to get a warning because the certificate is self-signed. But since we set this up on purpose, it's safe to ignore during development.

Extra: For a more powerful proxy solution, try out [mitmproxy](https://mitmproxy.org/)

### Final

🎉 Once you get your development app to run on `https://dev.realdevsquad.com`, you will be able to access the backend APIs without any CORS issues.

Visit `https://dev.realdevsquad.com`, if it doesn't open then go to Advanced and click on `Continue to dev.realdevsquad.com (unsafe)`

6. **Creating a new branch**

Let's create a new branch to work on. We require a different branch so that we always have a stable, working version in the default (develop-ember) branch. We're not supposed to touch the **main** branch as it is the one getting deployed on production.

```

git checkout -b <branch-name>

```

We will try to name the branch according to the task we are going to perform in it. If it is going to be a `feature`, the branch name should begin with `feat` or `feature`. If it is going to be a `fix`, the branch name should begin with `fix` or `bugfix`. The branch name should be self-explanatory.
For example, if I want to work on a `feature` called `login-form`, the branch name will be **feature/login-form**. If it is going to be a `fix` in `navbar`, the branch name will be `fix/navbar`.
Command example:

```

git checkout -b feature/login-form

```

7. **Just do it!**

Perform the tasks you wanted to, can be anything, ranging from fixing simple typo to re-designing the whole page!

8. **Committing your changes**

Now you have made the changes, though they are saved in your system, Git doesn't know what changes you've done. So you have to **commit** your changes. First step is to add the files which you want to add to the staging area, the dot after **add** in the first command tells Git to check for changes in all the files. The second step is about committing your changes. The message part is short description of your commit, like "adds a login form on homepage". Please make sure NOT to have commit messages like "fix issue#34". When we look at the commit history, we should understand what a particular commit is supposed to do based on the commit message.

```

git add .
git commit -m "Write message about your commit"

```

9. **Making sure you have the latest changes from the develop-ember branch**

It may so happen that since the last time you cloned the repo/took a pull from develop-ember, some changes may be merged in the develop-ember branch. So to be on the safer side, we should have those changes as well.

In order to do that, we first checkout to **develop-ember** branch by:

```

git checkout develop-ember

```

Once we're in develop-ember, it's time to take a pull:

```

git pull upstream develop-ember

```

Now that our **local** develop-ember branch is in sync with **remote** develop-ember branch (of the Real Dev Squad Repository), we should let our branch know about the changes from the develop-ember branch (if any). To do so we first checkout to our branch:

```

git checkout <branch-name>

```

Once we're in our branch, we **rebase** our branch on top of the current develop-ember branch (we change the base of our branch, so that it appears as if we have worked from the time the latest changes were merged in the develop-ember branch). To do so:

```

git rebase develop-ember

```

You should solve the merge conflicts, if any.

10. **Pushing the code**

Now that we have made our changes plus we have the latest changes made by other contributors, we should push our code from **local** branch to the same branch on our **GitHub fork**. We do so by:

```

git push origin <branch-name>

```

For example, if the branch name is `feat/login-form`, we enter `git push origin feat/login-form`

The **origin** refers to your GitHub fork. You can check it by entering `git remote -v`, you should get the link to your fork against **origin**.

11. **Making a pull request**

Your GitHub fork now has the changes, but you want those changes to be merged in the Real Dev Squad repository, right? There's a twist, you can't directly merge your code in the Real Dev Squad. Imagine you own a company whose code is open sourced, would you like if anyone could code make changes directly to the deployed branch without asking you? For the same reason, **Pull Requests** exist. You `request` the repository maintainers/admins to `pull` your code in their repository.

To make a pull request, go to your **forked repository** and you'll see **<branch-name> had recent pushes less than a minute ago** . Right next to it will be an option to **Compare & pull request**. Make sure the base branch is **develop-ember** while raising the pull requests.
Click on it, submit your pull request (also known as _PR_) explaining what you've done. Again, the PR title should be self-explanatory but concise. If you want to write details, you can add it in the description. If you're making some UI (User Interface) changes, please make sure to add a short screen recording. If that's not possible, at least add some screenshots.

![how-to-create-pull-request](https://i.imgur.com/zYSuNY7.png)

12. **Review stage**

Now the maintainers/admins will review your pull request. They might suggest some changes if required. You should then make the required changes in the **same branch**, commit them and push your changes to the **same branch** (follow the steps 7, 8 and 9 for the same).

13. **Congratulations on your first Pull Request in Real Dev Squad! 🎉**

```

```
