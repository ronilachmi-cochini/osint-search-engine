category.sources.forEach((source, index) => {

            setTimeout(() => {

                window.open(
                    source.url.replace("{query}", query),
                    "_blank"
                );

            }, index * 400);

        });

    };

});
