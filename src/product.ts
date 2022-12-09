import { Ref } from "vue";
import { useQuery, UseQueryOptions, UseQueryReturnType } from "@tanstack/vue-query";

export interface ProductDTO {
    id: number,
    name: string,
}

function findProductInCatalogCache(
    productId: number | undefined,
): ProductDTO | undefined {
    if (productId === 1) {
        // In the real app here located the code that looks up the product information in the cache of the vueQuery
        // filled in by app when a request is made to get a list of products within a certain category.
        // We do not want to make a request for information about a specific product if this information can be obtained from the cache.
        // This situation is possible when we go from the page with the list of products to the page of a specific product.
        return {
            id: 1,
            name: "Product #1 is from external cache"
        }
    }

    return undefined;
}

function loadProduct(
    productId: number | undefined
): Promise<ProductDTO | null> {
    return new Promise(resolve => {
        setTimeout(() => {
            if (productId === 1 || productId === 2) {
                // In the real app here located the code that retrieves product information from the server.
                // The product with the specified id may not exist and in this case promise should returns null
                resolve({
                    id: productId,
                    name: `Product #${productId} is from server`
                })
            } else {
                // All other products do not exist on the server
                resolve(null)
            }
        }, 2000);
    });
}

export function useProduct(
    productId: Ref<number | undefined>,
): UseQueryReturnType<ProductDTO | null, unknown> {
    const options: UseQueryOptions<ProductDTO | null, unknown> = {
        queryKey: ["product", productId],
        queryFn: () => loadProduct(productId.value),
        staleTime: 24 * 60 * 60 * 1000,
        initialData: () => findProductInCatalogCache(productId.value),
    };

    return useQuery(options);
}
