class ExtractPostsService {
    extractHtmlTag(parsedHtml) {
        return parsedHtml.find(
            (el) =>
                el.tagName &&
                el.tagName === 'html'
        );
    }

    extractBodyTag(parsedHtml) {
        return parsedHtml.children.find(
            (el) =>
                el.tagName &&
                el.tagName === 'body'
        );
    }

    extractWrap(parsedHtml) {
        return parsedHtml.children.find(
            (el) =>
                el.attributes &&
                el.attributes.length > 0 &&
                el.attributes[0].value === 'wrap'
        );
    }

    extractForumBegins(parsedHtml) {
        return parsedHtml.children.filter(
            (el) =>
                el.attributes &&
                el.attributes.some(
                    (attribute) =>
                        attribute.value ===
                        'forumbegin'
                )
        );
    }

    extractOdstep1as(parsedHtml) {
        return parsedHtml.children.find(
            (el) =>
                el.attributes &&
                el.attributes.some(
                    (attribute) =>
                        attribute.value ===
                        'odstep1a'
                )
        );
    }

    extractOdstep2s(parsedHtml) {
        return parsedHtml.children.find(
            (el) =>
                el.attributes &&
                el.attributes.some(
                    (attribute) =>
                        attribute.value ===
                        'odstep2'
                )
        );
    }

    extractForum4s(parsedHtml) {
        return parsedHtml.children.find(
            (el) =>
                el.attributes &&
                el.attributes.some(
                    (attribute) =>
                        attribute.value ===
                        'forum4'
                )
        );
    }

    createLastPostData(parsedHtml) {
        const authorATag = parsedHtml.children.find(
            (el) =>
                el.tagName === 'a' &&
                el.attributes.some(
                    (attribute) =>
                        attribute.key ===
                            'class' &&
                        attribute.value ===
                            'username-coloured'
                )
        );
        const przezElParts = authorATag
            ? []
            : parsedHtml.children
                  .find(
                      (el) =>
                          el.type === 'text' &&
                          el.content.startsWith(
                              'przez '
                          )
                  )
                  .content.split(' &raquo; ');

        const author = authorATag
            ? authorATag.children[0].content
            : przezElParts[0]
                  .replace('przez ', '')
                  .replace('\r\n\t\t\t\t\t', '');
        const createdAt = parsedHtml.children[
            parsedHtml.children.length - 1
        ].content.replace('\r\n\t', '');
        const url = parsedHtml.children
            .find(
                (el) =>
                    el.children &&
                    el.children.some(
                        (e) => e.tagName === 'img'
                    )
            )
            .attributes[0].value.replaceAll(
                'amp;',
                ''
            )
            .replace(
                '.',
                'http://shinobi-war.kylos.pl'
            );

        return {
            author,
            createdAt,
            url
        };
    }

    extractPosts(parsedHtml) {
        const posts = [];

        const htmlTag = this.extractHtmlTag(
            parsedHtml
        );

        const bodyTag = this.extractBodyTag(
            htmlTag
        );

        const wrap = this.extractWrap(bodyTag);

        const forumBegins = this.extractForumBegins(
            wrap
        );

        for (const forumBegin of forumBegins) {
            const postData = this.extractOdstep1as(
                forumBegin
            );

            const authorATag = postData.children.find(
                (el) =>
                    el.tagName === 'a' &&
                    el.attributes.some(
                        (attribute) =>
                            attribute.key ===
                                'class' &&
                            attribute.value ===
                                'username-coloured'
                    )
            );
            const przezElParts = authorATag
                ? []
                : postData.children
                      .find(
                          (el) =>
                              el.type ===
                                  'text' &&
                              el.content.startsWith(
                                  'przez '
                              )
                      )
                      .content.split(' &raquo; ');

            const title = postData.children.find(
                (el) => el.tagName === 'a'
            ).children[0].content;
            const numberOfPosts =
                parseInt(
                    this.extractOdstep2s(
                        forumBegin
                    ).children[0].children[0]
                        .content
                ) + 1;
            const author = authorATag
                ? authorATag.children[0].content
                : przezElParts[0].replace(
                      'przez ',
                      ''
                  );
            const createdAt = authorATag
                ? postData.children
                      .find(
                          (el) =>
                              el.type ===
                                  'text' &&
                              el.content.startsWith(
                                  ' &raquo; '
                              )
                      )
                      .content.replace(
                          ' &raquo; ',
                          ''
                      )
                      .replace('\r\n\t', '')
                : przezElParts[1].replace(
                      '\r\n\t',
                      ''
                  );
            const lastPost = this.createLastPostData(
                this.extractForum4s(forumBegin)
            );

            posts.push({
                title,
                numberOfPosts,
                author,
                createdAt,
                lastPost
            });
        }

        return posts;
    }
}

module.exports = ExtractPostsService;
