import type { DocumentTypeDecoration, ResultOf } from '@graphql-typed-document-node/core';
import type { Incremental, TypedDocumentString } from './graphql.js';
export type FragmentType<TDocumentType extends DocumentTypeDecoration<any, any>> = TDocumentType extends DocumentTypeDecoration<infer TType, any> ? [TType] extends [{
    ' $fragmentName'?: infer TKey;
}] ? TKey extends string ? {
    ' $fragmentRefs'?: {
        [key in TKey]: TType;
    };
} : never : never : never;
export declare function useFragment<TType>(_documentNode: DocumentTypeDecoration<TType, any>, fragmentType: FragmentType<DocumentTypeDecoration<TType, any>>): TType;
export declare function useFragment<TType>(_documentNode: DocumentTypeDecoration<TType, any>, fragmentType: FragmentType<DocumentTypeDecoration<TType, any>> | undefined): TType | undefined;
export declare function useFragment<TType>(_documentNode: DocumentTypeDecoration<TType, any>, fragmentType: FragmentType<DocumentTypeDecoration<TType, any>> | null): TType | null;
export declare function useFragment<TType>(_documentNode: DocumentTypeDecoration<TType, any>, fragmentType: FragmentType<DocumentTypeDecoration<TType, any>> | null | undefined): TType | null | undefined;
export declare function useFragment<TType>(_documentNode: DocumentTypeDecoration<TType, any>, fragmentType: Array<FragmentType<DocumentTypeDecoration<TType, any>>>): Array<TType>;
export declare function useFragment<TType>(_documentNode: DocumentTypeDecoration<TType, any>, fragmentType: Array<FragmentType<DocumentTypeDecoration<TType, any>>> | null | undefined): Array<TType> | null | undefined;
export declare function useFragment<TType>(_documentNode: DocumentTypeDecoration<TType, any>, fragmentType: ReadonlyArray<FragmentType<DocumentTypeDecoration<TType, any>>>): ReadonlyArray<TType>;
export declare function useFragment<TType>(_documentNode: DocumentTypeDecoration<TType, any>, fragmentType: ReadonlyArray<FragmentType<DocumentTypeDecoration<TType, any>>> | null | undefined): ReadonlyArray<TType> | null | undefined;
export declare function makeFragmentData<F extends DocumentTypeDecoration<any, any>, FT extends ResultOf<F>>(data: FT, _fragment: F): FragmentType<F>;
export declare function isFragmentReady<TQuery, TFrag>(queryNode: TypedDocumentString<TQuery, any>, fragmentNode: TypedDocumentString<TFrag, any>, data: FragmentType<TypedDocumentString<Incremental<TFrag>, any>> | null | undefined): data is FragmentType<typeof fragmentNode>;
