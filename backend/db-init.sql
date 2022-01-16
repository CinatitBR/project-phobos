--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2022-01-16 20:01:01

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16478)
-- Name: added_public_pdf; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.added_public_pdf (
    pdf_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.added_public_pdf OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16452)
-- Name: page; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.page (
    id integer NOT NULL,
    pdf_id integer NOT NULL,
    number integer NOT NULL,
    body text NOT NULL
);


ALTER TABLE public.page OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16451)
-- Name: page_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.page_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.page_id_seq OWNER TO postgres;

--
-- TOC entry 3372 (class 0 OID 0)
-- Dependencies: 217
-- Name: page_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.page_id_seq OWNED BY public.page.id;


--
-- TOC entry 216 (class 1259 OID 16433)
-- Name: pdf; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pdf (
    id integer NOT NULL,
    filename character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    user_id integer NOT NULL,
    tag_id integer NOT NULL,
    size integer NOT NULL,
    is_public bit(1) NOT NULL,
    stars integer NOT NULL
);


ALTER TABLE public.pdf OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16432)
-- Name: pdf_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pdf_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pdf_id_seq OWNER TO postgres;

--
-- TOC entry 3373 (class 0 OID 0)
-- Dependencies: 215
-- Name: pdf_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pdf_id_seq OWNED BY public.pdf.id;


--
-- TOC entry 214 (class 1259 OID 16421)
-- Name: pdf_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pdf_tag (
    id integer NOT NULL,
    tag_name character varying(255) NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.pdf_tag OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16420)
-- Name: pdf_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pdf_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pdf_tag_id_seq OWNER TO postgres;

--
-- TOC entry 3374 (class 0 OID 0)
-- Dependencies: 213
-- Name: pdf_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pdf_tag_id_seq OWNED BY public.pdf_tag.id;


--
-- TOC entry 219 (class 1259 OID 16465)
-- Name: public_pdf_like; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.public_pdf_like (
    pdf_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.public_pdf_like OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16407)
-- Name: refresh_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.refresh_token (
    id integer NOT NULL,
    user_id integer NOT NULL,
    refresh_token text NOT NULL
);


ALTER TABLE public.refresh_token OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16406)
-- Name: refresh_token_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.refresh_token_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.refresh_token_id_seq OWNER TO postgres;

--
-- TOC entry 3375 (class 0 OID 0)
-- Dependencies: 211
-- Name: refresh_token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.refresh_token_id_seq OWNED BY public.refresh_token.id;


--
-- TOC entry 210 (class 1259 OID 16396)
-- Name: user_account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_account (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL
);


ALTER TABLE public.user_account OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16395)
-- Name: user_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_account_id_seq OWNER TO postgres;

--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 209
-- Name: user_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_account_id_seq OWNED BY public.user_account.id;


--
-- TOC entry 3196 (class 2604 OID 16455)
-- Name: page id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page ALTER COLUMN id SET DEFAULT nextval('public.page_id_seq'::regclass);


--
-- TOC entry 3195 (class 2604 OID 16436)
-- Name: pdf id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pdf ALTER COLUMN id SET DEFAULT nextval('public.pdf_id_seq'::regclass);


--
-- TOC entry 3194 (class 2604 OID 16424)
-- Name: pdf_tag id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pdf_tag ALTER COLUMN id SET DEFAULT nextval('public.pdf_tag_id_seq'::regclass);


--
-- TOC entry 3193 (class 2604 OID 16410)
-- Name: refresh_token id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_token ALTER COLUMN id SET DEFAULT nextval('public.refresh_token_id_seq'::regclass);


--
-- TOC entry 3192 (class 2604 OID 16399)
-- Name: user_account id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_account ALTER COLUMN id SET DEFAULT nextval('public.user_account_id_seq'::regclass);


--
-- TOC entry 3366 (class 0 OID 16478)
-- Dependencies: 220
-- Data for Name: added_public_pdf; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3364 (class 0 OID 16452)
-- Dependencies: 218
-- Data for Name: page; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3362 (class 0 OID 16433)
-- Dependencies: 216
-- Data for Name: pdf; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3360 (class 0 OID 16421)
-- Dependencies: 214
-- Data for Name: pdf_tag; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3365 (class 0 OID 16465)
-- Dependencies: 219
-- Data for Name: public_pdf_like; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3358 (class 0 OID 16407)
-- Dependencies: 212
-- Data for Name: refresh_token; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3356 (class 0 OID 16396)
-- Dependencies: 210
-- Data for Name: user_account; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 217
-- Name: page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.page_id_seq', 47, true);


--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 215
-- Name: pdf_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pdf_id_seq', 12, true);


--
-- TOC entry 3379 (class 0 OID 0)
-- Dependencies: 213
-- Name: pdf_tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pdf_tag_id_seq', 6, true);


--
-- TOC entry 3380 (class 0 OID 0)
-- Dependencies: 211
-- Name: refresh_token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.refresh_token_id_seq', 3, true);


--
-- TOC entry 3381 (class 0 OID 0)
-- Dependencies: 209
-- Name: user_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_account_id_seq', 2, true);


--
-- TOC entry 3206 (class 2606 OID 16459)
-- Name: page page_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page
    ADD CONSTRAINT page_pkey PRIMARY KEY (id);


--
-- TOC entry 3204 (class 2606 OID 16440)
-- Name: pdf pdf_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pdf
    ADD CONSTRAINT pdf_pkey PRIMARY KEY (id);


--
-- TOC entry 3202 (class 2606 OID 16426)
-- Name: pdf_tag pdf_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pdf_tag
    ADD CONSTRAINT pdf_tag_pkey PRIMARY KEY (id);


--
-- TOC entry 3200 (class 2606 OID 16414)
-- Name: refresh_token refresh_token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_token
    ADD CONSTRAINT refresh_token_pkey PRIMARY KEY (id);


--
-- TOC entry 3198 (class 2606 OID 16403)
-- Name: user_account user_account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_pkey PRIMARY KEY (id);


--
-- TOC entry 3214 (class 2606 OID 16481)
-- Name: added_public_pdf added_public_pdf_pdf_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.added_public_pdf
    ADD CONSTRAINT added_public_pdf_pdf_id_fkey FOREIGN KEY (pdf_id) REFERENCES public.pdf(id);


--
-- TOC entry 3215 (class 2606 OID 16486)
-- Name: added_public_pdf added_public_pdf_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.added_public_pdf
    ADD CONSTRAINT added_public_pdf_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_account(id);


--
-- TOC entry 3207 (class 2606 OID 16415)
-- Name: refresh_token fk_user_account; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_token
    ADD CONSTRAINT fk_user_account FOREIGN KEY (user_id) REFERENCES public.user_account(id);


--
-- TOC entry 3211 (class 2606 OID 16460)
-- Name: page page_pdf_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page
    ADD CONSTRAINT page_pdf_id_fkey FOREIGN KEY (pdf_id) REFERENCES public.pdf(id);


--
-- TOC entry 3210 (class 2606 OID 16446)
-- Name: pdf pdf_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pdf
    ADD CONSTRAINT pdf_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.pdf_tag(id);


--
-- TOC entry 3208 (class 2606 OID 16427)
-- Name: pdf_tag pdf_tag_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pdf_tag
    ADD CONSTRAINT pdf_tag_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_account(id);


--
-- TOC entry 3209 (class 2606 OID 16441)
-- Name: pdf pdf_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pdf
    ADD CONSTRAINT pdf_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_account(id);


--
-- TOC entry 3212 (class 2606 OID 16468)
-- Name: public_pdf_like public_pdf_like_pdf_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_pdf_like
    ADD CONSTRAINT public_pdf_like_pdf_id_fkey FOREIGN KEY (pdf_id) REFERENCES public.pdf(id);


--
-- TOC entry 3213 (class 2606 OID 16473)
-- Name: public_pdf_like public_pdf_like_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_pdf_like
    ADD CONSTRAINT public_pdf_like_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_account(id);


-- Completed on 2022-01-16 20:01:01

--
-- PostgreSQL database dump complete
--

