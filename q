[33mcommit dc6b478412c494a56a4a85b6cb00827ada0054f2[m[33m ([m[1;36mHEAD -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m, [m[1;31morigin/HEAD[m[33m)[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Mon Dec 11 16:28:20 2023 -0700

    fixed some css

[33mcommit fb9cb7fbe00897b6b49a146b80f070fa50929972[m
Merge: 4822ec2 0669fe2
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Sat Dec 9 15:29:48 2023 -0700

    Merge branch 'main' of https://github.com/prestonyford/startup

[33mcommit 4822ec2e840cd2937743a0f655b14968ffeb2097[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Sat Dec 9 15:29:25 2023 -0700

    fixed icon paths

[33mcommit 0669fe2757573342cbf1e9adf7afad29f7c6ddfe[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Sat Dec 9 15:22:54 2023 -0700

    Update README.md

[33mcommit 608d067f185e00e107e1c23973df2b0fb3c98b47[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Sat Dec 9 15:05:05 2023 -0700

    4 chatroom support

[33mcommit e2a81916b3ee836a6bbe049593c946f5bc2a8a32[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Sat Dec 9 14:54:35 2023 -0700

    room A is finally complete

[33mcommit 8e8e35d6485d2c219d18c5d73b700a6eb7cbde8e[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Sat Dec 9 10:52:26 2023 -0700

    gifs are back

[33mcommit 7967b0b6a835369107a0442775f43e2f7c86d1eb[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Sat Dec 9 10:17:47 2023 -0700

    changed setter for messages to functional form which previously caused an issue that almost cost me my sanity

[33mcommit 76fc411077fb625284df0dd75edbe8823cc9aeb4[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Sat Dec 9 00:04:35 2023 -0700

    moved messages container to its own component

[33mcommit 5d7d5fba21bbe4196d112442ee529629bb581834[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Fri Dec 8 18:23:06 2023 -0700

    require non-empty message to send, authState is no longer a prop for room_selection (it now checks the cookie for authentication)

[33mcommit 54cb13076db816404a27503a1de4070cb3625080[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Fri Dec 8 10:58:48 2023 -0700

    message sending but dispay is not correct

[33mcommit 5fbd6a2044e227f27153286588ed4315855fe6a4[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Thu Dec 7 18:37:39 2023 -0700

    chatroom, history loading

[33mcommit bfd1c18e8f2fa1f30177a52a1a8ccb2149966b98[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Thu Dec 7 10:50:14 2023 -0700

    moved some css

[33mcommit 93cc81cbf737e8b72feb6b3e389711c2169e3da3[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Thu Dec 7 10:45:15 2023 -0700

    room selection page and user count websocket probably works but can't test it yet

[33mcommit bd822305926c60230a8fa3c4855122f41245964b[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Dec 6 22:51:34 2023 -0700

    loading blocks

[33mcommit 46dd1739df260ec103279586e4f3f11c0cb40a00[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Dec 6 22:19:41 2023 -0700

    login page functional

[33mcommit 2f8aa9403f5b33046a50fd22e0d0007ae6e58fa5[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Dec 6 21:30:32 2023 -0700

    some functionality brought back to login page

[33mcommit 76646366a9199d7039df3aeba13cb6c3371e9ac8[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Dec 6 19:14:05 2023 -0700

    BrowserRouter

[33mcommit 905667c48a3774903f282a4633300ee81be763c8[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Wed Nov 29 15:38:23 2023 -0700

    Update README.md

[33mcommit e76162ffd49c3586a66ea4c5fa350296c8084818[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Tue Nov 28 22:39:30 2023 -0700

    Update README.md

[33mcommit 142ff0813636715bc140900c87560a9ffa978ad3[m
Merge: 0cc26e1 3e12883
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Tue Nov 28 22:28:56 2023 -0700

    Merge branch 'main' of https://github.com/prestonyford/startup

[33mcommit 0cc26e1e2ba80a8a9bd9ab7cfff23bda1d937148[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Tue Nov 28 22:28:49 2023 -0700

    frontend no longer calls history endpoint; that is now handled by the websocket server. Also, on a socket close, sends a message to all users that the user has left.

[33mcommit 982333ed51b35d28cf3219c450b79d51729531a4[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Tue Nov 28 21:16:38 2023 -0700

    basic websocket done, fixed history problem

[33mcommit d46b088393993d74bd29691001b78f24880dc9ba[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Tue Nov 28 21:03:55 2023 -0700

    history working except for GIFS

[33mcommit f2881a2a9af3d27b1b961a9d20dda9ab370d2b0f[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Tue Nov 28 20:19:01 2023 -0700

    websocket for basic messages

[33mcommit 7c9804b44681ff266dd1d09b7729786a68299728[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Mon Nov 27 13:36:26 2023 -0700

    fixed scrolling issue on chrome

[33mcommit 12408083dd51352ce4c925817788785a4a747e6e[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Mon Nov 27 13:10:56 2023 -0700

    more refactor, fixed media queries

[33mcommit 1c10a1bb85afaea3cd4b9f1581e3c31c454bbb7d[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Mon Nov 27 09:42:40 2023 -0700

    chatroom html/css refactor

[33mcommit 73c1773dc723f5051113e4e7e15c8761858f14c9[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Fri Nov 24 16:55:06 2023 -0700

    login page now sends a request to server onload to check if login cookie exists

[33mcommit 3e12883cf162f9a73fe2021e1a89c04462652c50[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Sat Nov 18 14:54:39 2023 -0700

    Update README.md

[33mcommit 72620f7f59e169efc48cd68bfb1837bca4233097[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Sat Nov 18 14:46:25 2023 -0700

    adjusted size of left window in chatroom page

[33mcommit 8414274ffb18c5d35757a25cb36c41c881d098d8[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Sat Nov 18 14:33:38 2023 -0700

    chatroom needs to authenticate before displaying history

[33mcommit 8c671ee7d5079923b117c2056d378a6c5601e079[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Sat Nov 18 10:55:18 2023 -0700

    create account API

[33mcommit 04c9dd37cf2b384414cb41ac6c6c89af7ecca1b6[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Sat Nov 18 10:24:30 2023 -0700

    login tabber

[33mcommit da8f193b95cb65d50944e1c727a057e2ce45690d[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Thu Nov 16 17:53:08 2023 -0700

    Update README.md
    
    database deliverable

[33mcommit b77a489ad75e20c8e0b650e9df70d67670d8bb79[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Thu Nov 16 17:48:04 2023 -0700

    Update notes.md

[33mcommit e49bcdbf1262674628fe3a9a3d5f1672998c0067[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Thu Nov 16 17:47:48 2023 -0700

    Update README.md
    
    removed the thing i meant to put in notes.md oops

[33mcommit 24149a65df6b84a0678f028ed62a6336523baeaa[m
Merge: 6a46b62 daa2bf5
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Thu Nov 16 17:46:54 2023 -0700

    Merge branch 'main' of https://github.com/prestonyford/startup

[33mcommit 6a46b62bb0bf8493f074d78cb73022e484e02feb[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Thu Nov 16 17:46:26 2023 -0700

    removed unnecessary message history being held in memory

[33mcommit 8599f30a9b043466806a10b4c343ddf9e4e5ad41[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Thu Nov 16 17:42:27 2023 -0700

    databse: storing and retrieving messages, retrieval based on new timestamp property in each message object

[33mcommit 87c6252cbbf37a4417beff661cc9557df90033c0[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Thu Nov 16 16:06:21 2023 -0700

    update gitignore

[33mcommit 2d4f902ef69ad7e2e383657056a4b79695d15998[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Thu Nov 16 16:00:05 2023 -0700

    refactored code for searching gifs

[33mcommit 6b05d5b386a4cb4819bb1a31b92e91e01041f6d0[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Thu Nov 16 15:54:58 2023 -0700

    refactored code for sending messages

[33mcommit 7c974505acc1bc288e8ab1a0784ed92e3fb8a785[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Thu Nov 16 15:38:55 2023 -0700

    renamed some functions to be more clear

[33mcommit daa2bf5b0a935a41b8f25060c71e165b20e1a285[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Tue Nov 14 15:14:19 2023 -0700

    Update README.md

[33mcommit ec32f9917e3267e6820069adfebecb5d19fb0816[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Mon Nov 13 17:04:45 2023 -0700

    mongodb and updated gitignore

[33mcommit ecafe90309ca358fca9ba285c12b6d48b95ae30d[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Fri Nov 10 17:28:56 2023 -0700

    Update README.md
    
    re-added js deliverable section

[33mcommit 8810770630a61228b9e7aab07518cd8c383faecd[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Fri Nov 10 17:22:47 2023 -0700

    replaced deploy script

[33mcommit 6a525700b08a121e35d9bcb64091e5146d3ae7ea[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Fri Nov 10 17:21:32 2023 -0700

    Update README.md

[33mcommit eb5380dc0a38894316c19d96d7b10d3d831841e6[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Fri Nov 10 17:20:39 2023 -0700

    Update README.md
    
    Updated service deliverable notes

[33mcommit b0586f3ba03687bb58621b4dfc71fc5483b00e8c[m
Merge: 76e1ad4 9218180
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Fri Nov 10 17:16:26 2023 -0700

    Merge branch 'main' of https://github.com/prestonyford/startup

[33mcommit 76e1ad451ae0023ff6c284c78d91145a4614cc1e[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Fri Nov 10 17:15:10 2023 -0700

    disabled other rooms temporarily

[33mcommit c8db0f45f5db08de75887b431c346bbe3d299c89[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Fri Nov 10 17:11:24 2023 -0700

    styling for self/other image messages

[33mcommit 71b6a6b4f0119eada5c0acc4df27792db648811c[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Fri Nov 10 16:39:24 2023 -0700

    gif search up and running

[33mcommit b74d5fe59eb62bd3d61857a4cdd633e62ef20be1[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Fri Nov 10 16:19:52 2023 -0700

    fixed endpoint

[33mcommit 3039b17969ebe8f721298e3c323a21b4aeb22065[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Fri Nov 10 10:41:10 2023 -0700

    config file with api

[33mcommit 42a46cd4c9c1432e99ce10ac7c48ab32fc9749e1[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Fri Nov 10 10:40:21 2023 -0700

    updated gitignore

[33mcommit cc3b81be415dab9081852bd8f0b2bd0b23b0cf54[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Fri Nov 10 10:16:48 2023 -0700

    GIF search bar

[33mcommit 921818017b0aead0ec4dd9db60262371c660ae5b[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Thu Nov 9 15:16:32 2023 -0700

    Update notes.md

[33mcommit 262f23b53f24c394067d6fa8a5e49440b63c6c01[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Nov 8 22:29:45 2023 -0700

    basic endpoints

[33mcommit f0a49c82eb089003f271235de45c78550b61c43f[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Nov 8 18:58:51 2023 -0700

    Revert "Merge branch 'main' of https://github.com/prestonyford/startup"
    
    This reverts commit 136a277945bcad2e7c5b2e45d11c4161adb949be, reversing
    changes made to 3258c1cf25e8b35a683e9805e267e727b8038afb.

[33mcommit 637903bccd28a6b1547fc201a29140a1f810f9fd[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Nov 8 18:58:47 2023 -0700

    test

[33mcommit 136a277945bcad2e7c5b2e45d11c4161adb949be[m
Merge: 3258c1c ac21564
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Nov 8 18:54:02 2023 -0700

    Merge branch 'main' of https://github.com/prestonyford/startup

[33mcommit 3258c1cf25e8b35a683e9805e267e727b8038afb[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Nov 8 18:51:59 2023 -0700

    added .gitignore

[33mcommit ac2156484b4942f8e7119cc149e1a852834a9d7f[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Thu Nov 2 15:16:04 2023 -0600

    Update notes.md

[33mcommit c5799bf0379b186e75be740bc5cb0293a834e6de[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Fri Oct 27 16:08:02 2023 -0600

    Update README.md

[33mcommit beb1240c2f980334658d62d891f14d41f6ae5227[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Fri Oct 27 16:06:20 2023 -0600

    Update README.md

[33mcommit 455d459d0f79b842bd89f2dc81238f0d76f10c05[m
Merge: 925e235 829074b
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Fri Oct 27 15:58:58 2023 -0600

    Merge branch 'main' of https://github.com/prestonyford/startup

[33mcommit 925e2356c41eb9d06f2f18f30b0cb5dd40c5a8b9[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Fri Oct 27 15:58:03 2023 -0600

    js for login page (username in localstorage), room selection page (check for username)

[33mcommit 829074bdfbb8799d5d479cff1bc66ea537d611b0[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Thu Oct 26 15:45:54 2023 -0600

    Update notes.md

[33mcommit b43d1033ab88bffae80274ce8615cd420515fdc5[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Oct 25 23:35:37 2023 -0600

    placeholder response

[33mcommit 748bda66adbcdb941594ecda90c7ffb8513fd1b5[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Oct 25 23:02:51 2023 -0600

    basic message js

[33mcommit 6557abed1ee22fe71cf59ba1c13e6d6a28d2b2d3[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Tue Oct 24 11:43:50 2023 -0600

    colors

[33mcommit 274efa9637cef5f18c04bf23f5ac062c69f72d41[m
Merge: 86c92df 6506fd3
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Sun Oct 22 18:35:25 2023 -0600

    Merge branch 'main' of https://github.com/prestonyford/startup

[33mcommit 86c92df2187ad8aa6f849b3d0b1832ea1587afb7[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Sun Oct 22 18:35:17 2023 -0600

    scrolling should now be completely fixed

[33mcommit b3a194160a808314fccaba99acf4129e1de295f4[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Sun Oct 22 17:58:08 2023 -0600

    the scrolling is sorta working now holy crap finally please dont break

[33mcommit 6506fd351b80d6753dd0d1113efacf119a592403[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Thu Oct 19 15:17:56 2023 -0600

    Update notes.md

[33mcommit 38c790b78a97449706f6d992d5bbd92170c4077d[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Tue Oct 17 17:26:50 2023 -0600

    Update notes.md

[33mcommit 21e0ca029e22b1c8da2ead9b0e0eca16c6a476bf[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Tue Oct 17 13:11:27 2023 -0600

    Update README.md

[33mcommit 698f32f59d3566c812cde80bf2b349c22fd2211a[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Fri Oct 13 18:53:46 2023 -0600

    Update README.md

[33mcommit ef6a1074c786261119b3232321bb39c7f5b1abf0[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Fri Oct 13 18:46:35 2023 -0600

    base CSS

[33mcommit 0258cad58a9a7e32e727ed40a4df75811a3fd1c7[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Fri Oct 13 14:02:52 2023 -0600

    Update README.md
    
    note at top

[33mcommit 370b9fe62b92a1bd276dbdeefafea0a9d5160c38[m
Merge: 3c40e68 236e9ef
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Fri Oct 13 09:49:58 2023 -0600

    Merge branch 'main' of https://github.com/prestonyford/startup

[33mcommit 3c40e6899623b3c6e06cb960f5ed9b682bb35b81[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Fri Oct 13 09:49:50 2023 -0600

    removed About link from header for now

[33mcommit eb515f92aba8148cb4538b36c318ae5333fe57af[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Fri Oct 13 09:48:47 2023 -0600

    CSS for index, rooms, chatroom

[33mcommit 236e9ef30579ec3b44fff286b80b2ed63c2a6863[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Thu Oct 12 15:16:53 2023 -0600

    Update notes.md

[33mcommit cbfb99d412fbba10c4680fe6412a9c80e5656a90[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Tue Oct 10 15:13:35 2023 -0600

    Update notes.md

[33mcommit e36a3ca4d0c68fece34d429377c1d051c34fb30f[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Thu Oct 5 19:11:58 2023 -0600

    Update notes.md

[33mcommit 4e4b9bde851effeb7ca5abe59b302b7030367627[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Tue Oct 3 17:14:52 2023 -0600

    Update notes.md

[33mcommit 5573b2fb1d06fe9a500b2676f7c41252442e2735[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Tue Oct 3 17:14:36 2023 -0600

    Update notes.md

[33mcommit 5e4f046b56401cf9bbe0f3c47336e90afb50cf67[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Tue Oct 3 15:16:56 2023 -0600

    Update notes.md

[33mcommit 7c9963dc05990e0a54916cfbe8f25ce5792125c6[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Tue Oct 3 11:50:15 2023 -0600

    Update notes.md

[33mcommit cac6c0c7d94fbac8d4b1887f5a3ee76a97df9825[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Tue Oct 3 11:47:44 2023 -0600

    Update notes.md

[33mcommit 9c4b181ed1427a95fcc828e30e2557bd362f0752[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Thu Sep 28 15:16:16 2023 -0600

    Update notes.md

[33mcommit d92d782e158c57710899d9df63225388995a31a4[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Wed Sep 27 12:41:02 2023 -0600

    Update README.md
    
    Info about GIF button

[33mcommit 1bf0f244e57aa5c9c74203c66667dea85524143f[m
Merge: 29efaa9 6e87f86
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Sep 27 12:39:32 2023 -0600

    Merge branch 'main' of https://github.com/prestonyford/startup

[33mcommit 29efaa9d5fb1904d496b71be8a19725b82043746[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Sep 27 12:39:27 2023 -0600

    GIF button

[33mcommit 6e87f866d1a393f708175b1dea15ed5c3ba05b5e[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Wed Sep 27 12:37:02 2023 -0600

    Update README.md
    
    HTML deliverable info

[33mcommit 2ea407bb5b8e1f6014d059e051045564bf06fc50[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Wed Sep 27 12:02:23 2023 -0600

    Update notes.md

[33mcommit 3536d509090214f9a947630f669230801fe5eaa6[m
Merge: 39514fe ca287ec
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Sep 27 11:59:41 2023 -0600

    Merge branch 'main' of https://github.com/prestonyford/startup

[33mcommit 39514fed46aaa2a2569fae51f41cb9ad6d657fa4[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Sep 27 11:46:43 2023 -0600

    return to login link

[33mcommit 0386669fd732c3765bb2e786a78a556ab8fe4dde[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Sep 27 11:45:02 2023 -0600

    button functionality on rooms.html

[33mcommit 6152e69b67c94a0497c3fc9b1e46012fa24ebd9d[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Sep 27 11:42:04 2023 -0600

    return to rooms button

[33mcommit 8494aeb2c4c8e347bb9146c22713799dd2a35f90[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Sep 27 11:40:23 2023 -0600

    rooms and chatroom html

[33mcommit 12e96f4ffd44cf8a4daa6a703e6cd6486d978d7f[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Sep 27 11:18:58 2023 -0600

    added login button

[33mcommit 092aacfce2bf57627a2e754b944941aa7fc3916b[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Sep 27 11:10:34 2023 -0600

    index

[33mcommit ca287eccc1c1bf91d9326364cc6b95ca48f5837a[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Tue Sep 26 16:42:00 2023 -0600

    Delete important video.webm

[33mcommit ad11927b4a2e93f9b34acee4d6c9065166a02bfb[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Tue Sep 26 16:41:30 2023 -0600

    Add files via upload

[33mcommit e57c8f44132cf4aeadea1153de1297b6add3eb69[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Tue Sep 19 19:41:49 2023 -0600

    Update README.md

[33mcommit 8b0557cab590ec9d3bb4e952de269271530510bf[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Tue Sep 19 18:56:24 2023 -0600

    Update notes.md

[33mcommit 272a73f974ae174c4f7bf200c8e4fe8db0bceb74[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Tue Sep 19 18:51:55 2023 -0600

    Update notes.md

[33mcommit a75403b5a98b1133f07bce570f80b2a8935ddf05[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Tue Sep 19 18:46:09 2023 -0600

    Update notes.md

[33mcommit c2fe8bb08fbdf821359c115853c6262e0a363308[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Tue Sep 19 18:22:02 2023 -0600

    Add files via upload

[33mcommit 38455ff1d319d67822b2ca096d2fc8d0815765a7[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Tue Sep 19 18:21:48 2023 -0600

    Update README.md

[33mcommit 2434910564cf63ea2967624118f9d0953fb8d702[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Wed Sep 13 16:16:10 2023 -0600

    Corrected readme link

[33mcommit c036aae77767c83e2f9bd3f8ef4df8a291616652[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Wed Sep 13 16:15:26 2023 -0600

    Create notes.md

[33mcommit 4b5f450715939db9e86935348cbc877108c50582[m
Merge: ba36ec0 22d665c
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Sep 13 16:10:45 2023 -0600

    Resolved

[33mcommit ba36ec0e1ed180c3eb5f111d432c94979586379c[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Sep 13 16:09:17 2023 -0600

    conflict?

[33mcommit 22d665cee4d49635a2d2db6f4b3a9bca7b67b8a6[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Wed Sep 13 16:08:24 2023 -0600

    Update conflictTest.md

[33mcommit e484b05b732768edeffe56d58f52e0c94b6ea10a[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Wed Sep 13 16:07:36 2023 -0600

    Update conflictTest.md

[33mcommit e8ab9dd164f499862ce53ce22caf9e1a933468e0[m
Author: Preston Ford <preston.y.ford@gmail.com>
Date:   Wed Sep 13 16:06:46 2023 -0600

    added conflictTest.md

[33mcommit 80f153159abd8c2f15e72f91c21677013c815a2e[m
Author: Preston Ford <103155705+prestonyford@users.noreply.github.com>
Date:   Tue Sep 12 23:39:31 2023 -0600

    Initial commit
