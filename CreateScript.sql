CREATE TABLE public.roles (
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    name character varying NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE public.games (
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    name character varying NOT NULL,
    current_round smallint,
    PRIMARY KEY (id)
);

CREATE TABLE public.categories (
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    name character varying,
    game_id bigint NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (game_id) REFERENCES public.games(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE public.people (
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    name character varying NOT NULL,
    game_id bigint NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (game_id) REFERENCES public.games(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE public.quotes (
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    content character varying,
    full_quote character varying,
    round smallint DEFAULT '1'::smallint NOT NULL,
    game_id bigint NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (game_id) REFERENCES public.games(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE public.quote_categories (
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    quote_id bigint,
    category_id bigint,
    PRIMARY KEY (id),
    FOREIGN KEY (quote_id) REFERENCES public.quotes(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE public.quote_people (
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    quote_id bigint,
    person_id bigint,
    PRIMARY KEY (id),
    FOREIGN KEY (quote_id) REFERENCES public.quotes(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES public.people(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE public.users (
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    username character varying NOT NULL,
    password_hash character varying NOT NULL,
    user_auth_token character varying NOT NULL,
    role character varying DEFAULT 'USER'::character varying NOT NULL,
    person_id bigint,
    game_id bigint NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (game_id) REFERENCES public.games(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES public.people(id) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (role) REFERENCES public.roles(name) ON UPDATE CASCADE ON DELETE SET DEFAULT
);

CREATE TABLE public.votes (
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    category_id bigint,
    quote_id bigint,
    person_id bigint,
    round smallint DEFAULT '1'::smallint NOT NULL,
    game_id bigint NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (quote_id) REFERENCES public.quotes(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES public.people(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES public.games(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE public.api_keys (
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    key uuid DEFAULT gen_random_uuid() NOT NULL,
    PRIMARY KEY (id)
);

CREATE VIEW public.quotes_with_details AS
 SELECT 
    q.id,
    q.content,
    array_agg(DISTINCT c.id) AS categories,
    array_agg(DISTINCT p.id) AS people
FROM 
    public.quotes q
LEFT JOIN public.quote_categories qc ON q.id = qc.quote_id
LEFT JOIN public.categories c ON qc.category_id = c.id
LEFT JOIN public.quote_people qp ON q.id = qp.quote_id
LEFT JOIN public.people p ON qp.person_id = p.id
GROUP BY q.id, q.content;