PGDMP                          z            postgres    15.0    15.0     T           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            U           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            V           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            W           1262    5    postgres    DATABASE     {   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_France.1252';
    DROP DATABASE postgres;
                postgres    false            X           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    4695            �           1259    20322    pokedex    TABLE     }  CREATE TABLE public.pokedex (
    id integer NOT NULL,
    name character varying(50),
    type_1 character varying(50),
    type_2 character varying(50),
    total integer,
    hp integer,
    attack integer,
    defense integer,
    attack_spe integer,
    defense_spe integer,
    speed integer,
    generation integer,
    legendary boolean,
    town character varying(200)
);
    DROP TABLE public.pokedex;
       public         heap    postgres    false            �           1259    20321    pokedex_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pokedex_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.pokedex_id_seq;
       public          postgres    false    385            Y           0    0    pokedex_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.pokedex_id_seq OWNED BY public.pokedex.id;
          public          postgres    false    384            �           2604    20325 
   pokedex id    DEFAULT     h   ALTER TABLE ONLY public.pokedex ALTER COLUMN id SET DEFAULT nextval('public.pokedex_id_seq'::regclass);
 9   ALTER TABLE public.pokedex ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    385    384    385            Q          0    20322    pokedex 
   TABLE DATA           �   COPY public.pokedex (id, name, type_1, type_2, total, hp, attack, defense, attack_spe, defense_spe, speed, generation, legendary, town) FROM stdin;
    public          postgres    false    385   �       Z           0    0    pokedex_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.pokedex_id_seq', 1, false);
          public          postgres    false    384            �           2606    20327    pokedex pokemon_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.pokedex
    ADD CONSTRAINT pokemon_key PRIMARY KEY (id);
 =   ALTER TABLE ONLY public.pokedex DROP CONSTRAINT pokemon_key;
       public            postgres    false    385            Q   +  x��Z�r�6>CO���R �D���v%*+�T�r�f��8�CF�R��z�$ۍ@����e�j,K2?������{3��d������n���wL��)͔�O��?
��nmۺ����s��[7L��ݫ��x�*��?Η�R���+%�9~�G|�o?^Iv����-X-�����L��{;l�u�n�d�&@�����h���+MP�:X&B�F]�R������J�h��aK����t;��b<�
X��d*�*v���c��/v;�D���O�+�}
m]�����m������/��-6��d.��6�MkO#�2Ch�Ye�?���[N��[|��8�"��8�Y��� ��ƍ��o���{��4<�?2yC���-�(���r5�$�ŹmK��,o���,=#�d�����Ly��>�lވfo`��i����h��֡]3�d��v����°��)��a�2�*��دpR��,���O%���J�q�e���0�>�q���0<#-�k`��n��� G��@d� V�"��b������?�=��|�c����Z��%�RE�9R��O�P�d�=�.qn��q?
��
M��+�zx蟲畬�a���:p~�??��~bߵn3���l�R�3��1��V�|׬������B�E ����{��nK<F~�hg��fLM��}�Q���M:�����������?s�U��ʳ&�z
 X׃H�"KkH畏�<�����\1�Hͽ0z�V͸b����$S%�U4.Ou)�}��>��j�� ���'�K�j��U�7ΛqP5Z�h��̮�W=���YE��x �J�j(U�7fQ
+v?���K�J���V㉨XͲ�԰��u���]����U��3����nמ���c�=o]��)�&y �b������P���=}�Ul�uz�c�vdbH��+��-�����)M���*��f�P�����'E�c�XZ\�5	8�}����
�9~���u�v:���1<X�a#(�g��
C��&���Q��*z�$�)etQ5�wS���;;.�A����V�9��>�(]Lܵp4�ۻf�7f�S`\ƺ/�&�5�ݴJ�s����:R*��o�F7���ҕJ�ԁ2�$�ué�]^�T<�2%���R��t�N��L���@2�-��R��/!D�XM
$+�*�"!,V��=�`�nv���3��I���Y������G� ��hAVSA�����m3�ݬ�C���yT��ac; ��G�\a�I{ϋ ��o�g��\�#='��,���7C�m������m�+���t��l��>���G(���
�ޛ�o�63����K����BWP�<x�mN�֔�F�6�6���a�D`I�#o��<sJ��[��(�� ��Wq��5{��'��r�N\+)���)1�6��xn9G7,���6�c���	��=���Z/$�݉����׶�#�����$}��~�f��t�^s6�Q��S�z����d��k�w��&�#��F���Xq��AҟB��u��bz�P�i�ar����^�2k5���~;m��'�)�O��/E�F_���D���Py��� �s�D��*Ƀ䚣�mߝ�I���'�c��y����-*�Y����tjb�]�?1z��B�H���xbB_� �_�0�+������&��.h���ܡ��))����	��iC/J/�	�tW8f<&�"&AB^��э��߶�6
��-��yFy~=RP���E*|<��̥�z^�-`����6�B�Pi�Y��ι���:V���uB@���=��.�����<\���s�RtȻ�0W�����T�n��]�<D��Q���ˁQw{`&IeU��z@��V/�D>��u�{M3�:2��\����=����4��<�82PA>�2�}�S�+,P��&��I!��r��]�|�F�\'�4���g�7u�>���-��虯�-
m�;.ECJ�4i�a*��|Ħ0��8'���7_��2M1L�>��ἌRI�o��(�B���P�����H�G���}�^�qv߷c?<,�T
%�T/f�8�����[M �<�	��^`�}���v��4��&�hAS�8�UyS$�$�f�����	�0���v�����\>�(Ҝ%�\�i����S�M�ya���w٨���C3��u�ZZS����jMqqg�H��W��v����8)�#�6V����'@�m
&�I*��̷C��c6�@U��;�����P����$�p�ul�F�����D��T��1:*�l�A�~�Qa�,��%	��NH�w�y��Y� ���|~Y�~���w6?�K�%٦�]��A�y���ˆф����`7ٺF�prv�����i����ޅ��.�퐽L���(cT>���='N����LVF%Z�p��h��0�?J�w@�g� ��,�Hs��#w��S�1K��#�����?�����C�V��Je���y4 
Pg�7�n@=$Lw�q
j:Z��H!������_r��P?��J��B����_��Աs�d�I�w9�@V��o��_��OI�OW���e�M��|��L�? �9�
�;5C�󉺼�(���T����ʲ0�&��SqQ��y��1K4N�d|�]����c��v �)N±���=��[� }�R������đuF�#˂�k���pݡ.>	 U����,�aFc6ͳ��GH�����Nthd_s��u@���{P*.�`,�]JdM��>;�ׯ���_���p�N ߛ���0��f?,4��%�]I��>�|0ɗ�!�����A�T9J�*�]���yǶ^6V��'.VU"�����%�M��tv�Y��ğ݌疀1F��FDz�8.W�����_2Gc��p�q����B�E��l&���qe�o�R=�a$�f��#&U
�%2�R-^�$�D�o>��p�a5����,���)�����G5��&��Q ���~��/��kvi�Lx�L,�6 H8�_��־q���{)���ZAh�kqko��x���Z�o����1*�     