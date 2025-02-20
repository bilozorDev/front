"use client";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  DialogBackdrop,
} from "@headlessui/react";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { UsersIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formatPrice } from "@/utils/formatPrice";
interface Product {
  id: string;
  vendor_id: string;
  name: string;
  model: string;
  description: string;
  price: number;
  product_url: string;
  image_url: string;
  image_urls: string[];
  availability: string;
  specs: Record<string, unknown>;
  last_updated: string;
  created_at: string;
  category_id: string;
  specs_image_url: string | null;
}
const products: Product[] = [
  {
    id: "185b7c58-2bd6-47fd-8367-0ef2cf736b6e",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Enterprise Campus 24 PoE",
    model: "ECS-24-PoE (1050W)",
    description:
      "Enterprise-grade 24-port, Layer 3 Etherlighting™ PoE+++ switch with high-capacity 10 GbE RJ45 and 25G SFP28 connections for high availability system design.",
    price: 2499,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/collections/enterprise-campus-24/products/ecs-24-poe",
    image_url:
      "https://cdn.ecomm.ui.com/products/f83443e3-38b7-415b-85cd-e3da1d0c044c/94278887-d486-4011-9b9e-844073ccdd4e.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/f83443e3-38b7-415b-85cd-e3da1d0c044c/94278887-d486-4011-9b9e-844073ccdd4e.png",
      "https://cdn.ecomm.ui.com/products/f83443e3-38b7-415b-85cd-e3da1d0c044c/c5e36f5d-d6a5-4bba-b2ee-3015db0980ff.png",
      "https://cdn.ecomm.ui.com/products/f83443e3-38b7-415b-85cd-e3da1d0c044c/fd5c9635-103f-462e-aacb-65e7677fcebb.png",
      "https://cdn.ecomm.ui.com/products/f83443e3-38b7-415b-85cd-e3da1d0c044c/c5819792-1669-4fd5-aa96-bd3cb0078d76.png",
      "https://cdn.ecomm.ui.com/products/f83443e3-38b7-415b-85cd-e3da1d0c044c/545e148f-1c03-4b41-ac70-8732171b37c1.png",
    ],
    availability: "Out of Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:17.329245+00:00",
    created_at: "2025-02-19T00:35:59.17197+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "48b82eb4-b332-488e-918e-a57f9754d3b6",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Aggregation",
    model: "USW-Aggregation",
    description: "An 8-port, Layer 2 switch made for 10G SFP+ connections.",
    price: 269,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-aggregation",
    image_url:
      "https://cdn.ecomm.ui.com/products/1c748fb1-b4df-43ef-83e0-d5ed26f9db7c/aa63ff89-e323-4f71-8e08-78639eff5511.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/1c748fb1-b4df-43ef-83e0-d5ed26f9db7c/aa63ff89-e323-4f71-8e08-78639eff5511.png",
      "https://cdn.ecomm.ui.com/products/1c748fb1-b4df-43ef-83e0-d5ed26f9db7c/a2787dba-e198-4c9b-af19-2e9a77fed7eb.png",
      "https://cdn.ecomm.ui.com/products/1c748fb1-b4df-43ef-83e0-d5ed26f9db7c/62a5034c-8fc5-482c-8cda-836f0e9c6533.png",
      "https://cdn.ecomm.ui.com/products/1c748fb1-b4df-43ef-83e0-d5ed26f9db7c/15b98089-5318-418b-ba61-f9c39c88a363.png",
      "https://cdn.ecomm.ui.com/products/1c748fb1-b4df-43ef-83e0-d5ed26f9db7c/3cadf6b3-5fa3-4de7-8bf3-f7f9bc93e8e2.png",
      "https://cdn.ecomm.ui.com/products/1c748fb1-b4df-43ef-83e0-d5ed26f9db7c/54b577f4-4105-4249-92a7-4c74c07698c7.png",
      "https://cdn.ecomm.ui.com/products/1c748fb1-b4df-43ef-83e0-d5ed26f9db7c/7224044a-017c-425a-9a87-afdb1ce68227.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:19.310378+00:00",
    created_at: "2025-02-19T00:35:58.072711+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "a4e37f38-bf80-48c1-851c-cb3bcffe15d6",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Enterprise 48 PoE",
    model: "USW-Enterprise-48-PoE (720W)",
    description: "A 48-port, Layer 3 switch with 2.5 GbE PoE+ output.",
    price: 1599,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-enterprise-48-poe",
    image_url:
      "https://cdn.ecomm.ui.com/products/81802ee3-ab5d-46f6-b6f7-2abbe2a5968b/8fd2135e-27fc-43ec-8cf5-b2806d2ba696.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/81802ee3-ab5d-46f6-b6f7-2abbe2a5968b/8fd2135e-27fc-43ec-8cf5-b2806d2ba696.png",
      "https://cdn.ecomm.ui.com/products/81802ee3-ab5d-46f6-b6f7-2abbe2a5968b/954a0d03-1db4-4c83-b5c6-5c2fcaa4f894.png",
      "https://cdn.ecomm.ui.com/products/81802ee3-ab5d-46f6-b6f7-2abbe2a5968b/41742982-4569-4f83-b209-3676a8374332.png",
      "https://cdn.ecomm.ui.com/products/81802ee3-ab5d-46f6-b6f7-2abbe2a5968b/370bee67-2313-43f0-84cb-7420ffd3b5a4.png",
      "https://cdn.ecomm.ui.com/products/81802ee3-ab5d-46f6-b6f7-2abbe2a5968b/8fa37d47-a552-4834-931c-5892a31037d9.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:21.024815+00:00",
    created_at: "2025-02-19T00:35:57.604032+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "e2fa5c40-7b8d-4100-86c2-4fc1835297b9",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Standard 24 PoE",
    model: "USW-24-POE (95W)",
    description: "A 24-port, Layer 2 PoE switch with a fanless cooling system.",
    price: 379,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-24-poe",
    image_url:
      "https://cdn.ecomm.ui.com/products/467359c4-e5c3-487b-ae00-f6b7de29c6fc/bccd785f-176e-4827-91d4-78bbd4b88bd9.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/467359c4-e5c3-487b-ae00-f6b7de29c6fc/bccd785f-176e-4827-91d4-78bbd4b88bd9.png",
      "https://cdn.ecomm.ui.com/products/467359c4-e5c3-487b-ae00-f6b7de29c6fc/c719c8e0-8958-4255-82e8-a966e35c9fd1.png",
      "https://cdn.ecomm.ui.com/products/467359c4-e5c3-487b-ae00-f6b7de29c6fc/3ee08e9f-f0f6-4ee0-983c-258d4bb0f8a3.png",
      "https://cdn.ecomm.ui.com/products/467359c4-e5c3-487b-ae00-f6b7de29c6fc/94c1e7c7-1302-4484-a2cc-0e155b46f615.png",
      "https://cdn.ecomm.ui.com/products/467359c4-e5c3-487b-ae00-f6b7de29c6fc/9d1f571f-6ec8-41c6-8576-a4046b4a5012.png",
      "https://cdn.ecomm.ui.com/products/467359c4-e5c3-487b-ae00-f6b7de29c6fc/79f450f1-afa3-4ba6-ad78-135347f6fc72.png",
      "https://cdn.ecomm.ui.com/products/467359c4-e5c3-487b-ae00-f6b7de29c6fc/ce9c3070-494d-40ca-ae24-4ad8f8b5f597.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:22.532038+00:00",
    created_at: "2025-02-19T00:35:57.841647+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "ff24d931-4440-49f5-b209-1ec0a6af873b",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Pro 48 PoE",
    model: "USW-Pro-48-POE (600W)",
    description:
      "A 48-port, Layer 3 switch capable of high-power PoE++ output.",
    price: 1099,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-pro-48-poe",
    image_url:
      "https://cdn.ecomm.ui.com/products/6e019f0c-26b5-4fdf-b4e1-994abd9ce6e1/19d0ce87-0b9b-45de-8c35-2bc19666e0a2.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/6e019f0c-26b5-4fdf-b4e1-994abd9ce6e1/19d0ce87-0b9b-45de-8c35-2bc19666e0a2.png",
      "https://cdn.ecomm.ui.com/products/6e019f0c-26b5-4fdf-b4e1-994abd9ce6e1/eb320f66-791c-43dd-a0b8-9864d734530d.png",
      "https://cdn.ecomm.ui.com/products/6e019f0c-26b5-4fdf-b4e1-994abd9ce6e1/87cd84da-2de6-4d1c-af8c-00c12b0a9ff6.png",
      "https://cdn.ecomm.ui.com/products/6e019f0c-26b5-4fdf-b4e1-994abd9ce6e1/1aa04365-39ae-42c5-bbb4-da81d40bce5b.png",
      "https://cdn.ecomm.ui.com/products/6e019f0c-26b5-4fdf-b4e1-994abd9ce6e1/8441cb41-3e78-4310-b447-ea3766b7155e.png",
      "https://cdn.ecomm.ui.com/products/6e019f0c-26b5-4fdf-b4e1-994abd9ce6e1/f339261e-1b3d-4d95-969d-c84869eceac3.png",
      "https://cdn.ecomm.ui.com/products/6e019f0c-26b5-4fdf-b4e1-994abd9ce6e1/42c6de9a-c4ba-48c9-a13a-9feeb492ecce.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:24.361434+00:00",
    created_at: "2025-02-19T00:35:57.517621+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "4d91a35a-87c8-43e2-a2ed-5bed5dcb52c9",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Enterprise Campus Aggregation",
    model: "ECS-Aggregation",
    description:
      "1.8 Tbps high-density 100G/25G Layer 3 Etherlighting™ aggregation switch with MC-LAG support for high availability system design.",
    price: 3999,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/ecs-aggregation",
    image_url:
      "https://cdn.ecomm.ui.com/products/82c1c564-0e08-4b27-a7b9-95729cca00bd/68b89669-0c43-4f77-a9c8-e997310d6459.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/82c1c564-0e08-4b27-a7b9-95729cca00bd/68b89669-0c43-4f77-a9c8-e997310d6459.png",
      "https://cdn.ecomm.ui.com/products/82c1c564-0e08-4b27-a7b9-95729cca00bd/ddb8a19d-242b-4d93-a7dc-70c1c2121ab3.png",
      "https://cdn.ecomm.ui.com/products/82c1c564-0e08-4b27-a7b9-95729cca00bd/27a4376a-5402-498f-b38b-214b1086c31b.png",
      "https://cdn.ecomm.ui.com/products/82c1c564-0e08-4b27-a7b9-95729cca00bd/aec50b98-1a81-45a4-bffc-5f2f5ba2003a.png",
      "https://cdn.ecomm.ui.com/products/82c1c564-0e08-4b27-a7b9-95729cca00bd/af0d9f9f-9838-4006-86d4-3cd0c314002b.png",
      "https://cdn.ecomm.ui.com/products/82c1c564-0e08-4b27-a7b9-95729cca00bd/f36fa878-d776-4b8b-8542-ef25d73ebfbd.png",
      "https://cdn.ecomm.ui.com/products/82c1c564-0e08-4b27-a7b9-95729cca00bd/a2fd9741-187b-4818-9805-9a4762ccd63e.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:26.144101+00:00",
    created_at: "2025-02-19T00:35:57.975844+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "3a17144b-ee9d-48cf-8023-c6d1bdbed1af",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Standard 24",
    model: "USW-24",
    description:
      "A 24-port, Layer 2 switch with a silent, fanless cooling system.",
    price: 225,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-24",
    image_url:
      "https://cdn.ecomm.ui.com/products/d443e087-efcf-47a1-8465-7fa3e60cf916/0bcd14e7-0303-4f76-b66d-4702ddfb249f.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/d443e087-efcf-47a1-8465-7fa3e60cf916/0bcd14e7-0303-4f76-b66d-4702ddfb249f.png",
      "https://cdn.ecomm.ui.com/products/d443e087-efcf-47a1-8465-7fa3e60cf916/198840df-f2ce-442a-a565-1c5c257ef27f.png",
      "https://cdn.ecomm.ui.com/products/d443e087-efcf-47a1-8465-7fa3e60cf916/cb541c51-a867-4518-b8a5-3590597b3160.png",
      "https://cdn.ecomm.ui.com/products/d443e087-efcf-47a1-8465-7fa3e60cf916/ffc5b300-a371-4f2b-b08e-6689e52d8daf.png",
      "https://cdn.ecomm.ui.com/products/d443e087-efcf-47a1-8465-7fa3e60cf916/77156738-b991-4065-b6dd-7111ce289397.png",
      "https://cdn.ecomm.ui.com/products/d443e087-efcf-47a1-8465-7fa3e60cf916/9eb230ba-b54b-454b-a2d2-20538a4624c7.png",
      "https://cdn.ecomm.ui.com/products/d443e087-efcf-47a1-8465-7fa3e60cf916/33ef00d4-0b0c-4dac-9013-aab04fcdd902.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:27.804024+00:00",
    created_at: "2025-02-19T00:35:58.99344+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "b378b96b-0f70-4ac0-a0c4-d2e611ec87c7",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Flex Mini 2.5G",
    model: "USW-Flex-2.5G-5",
    description:
      "Compact, 5-port 2.5G switch that can be powered with PoE or a USB-C adapter.",
    price: 49,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-flex-2-5g-5",
    image_url:
      "https://cdn.ecomm.ui.com/products/50830d51-4d7e-47ea-92f4-11043d3d664f/c3637e36-455a-4eed-b4cc-d0a15afe2fbe.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/50830d51-4d7e-47ea-92f4-11043d3d664f/c3637e36-455a-4eed-b4cc-d0a15afe2fbe.png",
      "https://cdn.ecomm.ui.com/products/50830d51-4d7e-47ea-92f4-11043d3d664f/d3cef4e0-c1e8-4f3a-b43c-288f4359ade1.png",
      "https://cdn.ecomm.ui.com/products/50830d51-4d7e-47ea-92f4-11043d3d664f/fcb9b5fe-9ad5-4f07-ae0f-846b8145797a.png",
      "https://cdn.ecomm.ui.com/products/50830d51-4d7e-47ea-92f4-11043d3d664f/9e442a75-a0ef-4948-b33e-e8c750c4d434.png",
      "https://cdn.ecomm.ui.com/products/50830d51-4d7e-47ea-92f4-11043d3d664f/65a31200-192c-4345-8826-2f46ca7a4aa2.png",
      "https://cdn.ecomm.ui.com/products/50830d51-4d7e-47ea-92f4-11043d3d664f/fd96f3fd-380b-45e4-a441-f58f33883f6e.png",
      "https://cdn.ecomm.ui.com/products/50830d51-4d7e-47ea-92f4-11043d3d664f/472a512a-1c34-47b4-a5f5-02700daf803a.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:29.272265+00:00",
    created_at: "2025-02-19T00:35:58.461654+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "85853ff7-b9d6-4a09-9941-5cce1fa4c2d3",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Ultra",
    model: "Product Collection (202W)",
    description:
      "A compact, Layer 2, 8-port GbE PoE switch with versatile mounting options.",
    price: 129,
    product_url:
      "https://store.ui.com/us/en/category/switching-utility/collections/pro-ultra",
    image_url:
      "https://cdn.ecomm.ui.com/products/d4e5408e-e2b4-4b32-b9d6-efdde2bbaaf3/a14e2dd8-e6de-44fe-95f6-2fb7574364b1.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/d4e5408e-e2b4-4b32-b9d6-efdde2bbaaf3/a14e2dd8-e6de-44fe-95f6-2fb7574364b1.png",
      "https://cdn.ecomm.ui.com/products/d4e5408e-e2b4-4b32-b9d6-efdde2bbaaf3/390369e8-8018-4605-9d63-933a63d43920.png",
      "https://cdn.ecomm.ui.com/products/d4e5408e-e2b4-4b32-b9d6-efdde2bbaaf3/f082e20e-67ac-47f8-ac2f-c36f28d181de.png",
      "https://cdn.ecomm.ui.com/products/d4e5408e-e2b4-4b32-b9d6-efdde2bbaaf3/825abba5-66cc-4958-865a-ff29d2fc7845.png",
      "https://cdn.ecomm.ui.com/products/d4e5408e-e2b4-4b32-b9d6-efdde2bbaaf3/4070d0ba-ba68-4db5-9345-6b905e22cf47.png",
      "https://cdn.ecomm.ui.com/products/d4e5408e-e2b4-4b32-b9d6-efdde2bbaaf3/d010c27a-9a4f-4a7b-bedc-ae7ae0fbc9b3.png",
      "https://cdn.ecomm.ui.com/products/d4e5408e-e2b4-4b32-b9d6-efdde2bbaaf3/35499d79-a4cc-48f8-8414-bdaa1f923b15.png",
      "https://cdn.ecomm.ui.com/products/d4e5408e-e2b4-4b32-b9d6-efdde2bbaaf3/1923c1a4-eac7-4411-aec4-a226d303b1aa.png",
      "https://cdn.ecomm.ui.com/products/d4e5408e-e2b4-4b32-b9d6-efdde2bbaaf3/f5d9a3ba-4dce-461b-8a2b-695948d806fb.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:30.704976+00:00",
    created_at: "2025-02-19T00:35:58.367248+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "542c10fb-3192-4406-9785-2ec9dbab88fa",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Pro 48",
    model: "USW-Pro-48",
    description:
      "A 48-port, Layer 3 switch supporting 10G SFP+ connections with fanless cooling.",
    price: 599,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-pro-48",
    image_url:
      "https://cdn.ecomm.ui.com/products/17a1db0a-a705-4ea0-b538-2972ca71615a/81f22a98-40b9-41d1-9a58-f49c2353d465.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/17a1db0a-a705-4ea0-b538-2972ca71615a/81f22a98-40b9-41d1-9a58-f49c2353d465.png",
      "https://cdn.ecomm.ui.com/products/17a1db0a-a705-4ea0-b538-2972ca71615a/94154b21-0fd5-4f09-8bef-b2c6a48012ce.png",
      "https://cdn.ecomm.ui.com/products/17a1db0a-a705-4ea0-b538-2972ca71615a/a64b695c-f263-49a3-aea5-2092bb6d49aa.png",
      "https://cdn.ecomm.ui.com/products/17a1db0a-a705-4ea0-b538-2972ca71615a/a46c7f45-6908-4cad-8061-4d75fb319dc4.png",
      "https://cdn.ecomm.ui.com/products/17a1db0a-a705-4ea0-b538-2972ca71615a/c586c039-d790-4ed8-ad26-f85fa0191fc4.png",
      "https://cdn.ecomm.ui.com/products/17a1db0a-a705-4ea0-b538-2972ca71615a/658e38cb-5d94-4ae3-b5ae-2428eda270b9.png",
      "https://cdn.ecomm.ui.com/products/17a1db0a-a705-4ea0-b538-2972ca71615a/35e3d37f-6701-4f91-8a0c-9bc7d8113382.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:33.834533+00:00",
    created_at: "2025-02-19T00:35:58.862244+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "386c8946-50d8-49d1-a752-87f872ad2a03",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Pro HD 24",
    model: "USW-Pro-HD-24",
    description:
      "Professional-grade, Layer 3 Etherlighting™ switch with (2) 10 GbE, (22) 2.5 GbE, and (4) 10G SFP+ ports.",
    price: 599,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-pro-hd-24",
    image_url:
      "https://cdn.ecomm.ui.com/products/66804bfc-9afd-453c-adbb-7327d8cebe25/6217d1ec-0567-442c-a4ba-3a5f7504f298.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/66804bfc-9afd-453c-adbb-7327d8cebe25/6217d1ec-0567-442c-a4ba-3a5f7504f298.png",
      "https://cdn.ecomm.ui.com/products/66804bfc-9afd-453c-adbb-7327d8cebe25/be7acc45-40f7-4cc4-af94-cc469b424e06.png",
      "https://cdn.ecomm.ui.com/products/66804bfc-9afd-453c-adbb-7327d8cebe25/641b9669-4300-4cfa-aebf-b26484bc76bf.png",
      "https://cdn.ecomm.ui.com/products/66804bfc-9afd-453c-adbb-7327d8cebe25/ecd6fe64-c7b6-454c-9c6c-67aff3c78c89.png",
      "https://cdn.ecomm.ui.com/products/66804bfc-9afd-453c-adbb-7327d8cebe25/c8817ae7-a9cc-46ec-9fa6-fb4a8af12e38.png",
      "https://cdn.ecomm.ui.com/products/66804bfc-9afd-453c-adbb-7327d8cebe25/337836a7-5b02-4b15-b899-ef6e6d4136ee.png",
      "https://cdn.ecomm.ui.com/products/66804bfc-9afd-453c-adbb-7327d8cebe25/4de96550-42ce-4ffc-94b3-3205d319f20d.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:32.136516+00:00",
    created_at: "2025-02-19T00:35:58.681572+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "d2151615-764e-4971-a47f-33291c4c4eb7",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Pro Max 24 PoE",
    model: "USW-Pro-Max-24-PoE (400W)",
    description:
      "A 24-port, Layer 3 Etherlighting™ switch capable of high-power PoE++ output.",
    price: 799,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-pro-max-24-poe",
    image_url:
      "https://cdn.ecomm.ui.com/products/58922518-88f6-4c75-89c1-f57ba3d8253a/9a68d63e-39cf-4d14-83ff-79d2c35b1b8c.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/58922518-88f6-4c75-89c1-f57ba3d8253a/9a68d63e-39cf-4d14-83ff-79d2c35b1b8c.png",
      "https://cdn.ecomm.ui.com/products/58922518-88f6-4c75-89c1-f57ba3d8253a/1ac1cb5c-d5ea-4754-9476-4c57cc920023.png",
      "https://cdn.ecomm.ui.com/products/58922518-88f6-4c75-89c1-f57ba3d8253a/c4541c43-13ef-4d4b-a558-cf912456f893.png",
      "https://cdn.ecomm.ui.com/products/58922518-88f6-4c75-89c1-f57ba3d8253a/9da3459c-eee9-441f-ac25-dcd3d4477e43.png",
      "https://cdn.ecomm.ui.com/products/58922518-88f6-4c75-89c1-f57ba3d8253a/21098c89-1024-4fa2-a308-a6ebfe58b74d.png",
      "https://cdn.ecomm.ui.com/products/58922518-88f6-4c75-89c1-f57ba3d8253a/f7250827-4265-46a2-a5f2-1e618f620414.png",
      "https://cdn.ecomm.ui.com/products/58922518-88f6-4c75-89c1-f57ba3d8253a/1d2e725b-e11b-477f-9a78-c85348255f4a.png",
      "https://cdn.ecomm.ui.com/products/58922518-88f6-4c75-89c1-f57ba3d8253a/69e74a20-78ce-4385-87dc-6b21a06cb6ce.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:35.649912+00:00",
    created_at: "2025-02-19T00:35:57.408467+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "427a3881-2762-4c16-b390-dd8956ec3015",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Pro 24 PoE",
    model: "USW-Pro-24-POE (400W)",
    description:
      "A 24-port, Layer 3 switch capable of high-power PoE++ output.",
    price: 699,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-pro-24-poe",
    image_url:
      "https://cdn.ecomm.ui.com/products/5b69cdb5-e7ea-44e6-ae16-8714339038fb/2d7dc5a5-3d6e-439e-9f70-286465989b37.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/5b69cdb5-e7ea-44e6-ae16-8714339038fb/2d7dc5a5-3d6e-439e-9f70-286465989b37.png",
      "https://cdn.ecomm.ui.com/products/5b69cdb5-e7ea-44e6-ae16-8714339038fb/86a9743b-14e0-45bc-8f0b-6ab97ef197c9.png",
      "https://cdn.ecomm.ui.com/products/5b69cdb5-e7ea-44e6-ae16-8714339038fb/8f85af7b-7d44-4a3d-89e4-6e0c8fae35c1.png",
      "https://cdn.ecomm.ui.com/products/5b69cdb5-e7ea-44e6-ae16-8714339038fb/6f200019-3044-423e-8c8c-1bd02b67d4da.png",
      "https://cdn.ecomm.ui.com/products/5b69cdb5-e7ea-44e6-ae16-8714339038fb/b2409008-494c-4840-8e14-8c25eb005eed.png",
      "https://cdn.ecomm.ui.com/products/5b69cdb5-e7ea-44e6-ae16-8714339038fb/960057a6-fa0b-4321-88df-093c291a7169.png",
      "https://cdn.ecomm.ui.com/products/5b69cdb5-e7ea-44e6-ae16-8714339038fb/d260537b-daa5-4620-b1e4-eba96fee8da7.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:37.626308+00:00",
    created_at: "2025-02-19T00:35:57.563171+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "a3fee56d-87bc-43f6-9e65-20f6ce3831d2",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Enterprise 24 PoE",
    model: "USW-Enterprise-24-PoE (400W)",
    description: "A 24-port, Layer 3 switch with 2.5 GbE PoE+ output.",
    price: 799,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-enterprise-24-poe",
    image_url:
      "https://cdn.ecomm.ui.com/products/9f693a84-9dcb-452f-889a-faba29ac4b73/eb31a495-61bc-4e97-b3c9-b58dea225595.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/9f693a84-9dcb-452f-889a-faba29ac4b73/eb31a495-61bc-4e97-b3c9-b58dea225595.png",
      "https://cdn.ecomm.ui.com/products/9f693a84-9dcb-452f-889a-faba29ac4b73/7f1053ac-0a2b-400b-af4d-57213c9c4ea3.png",
      "https://cdn.ecomm.ui.com/products/9f693a84-9dcb-452f-889a-faba29ac4b73/2bd5bc9b-9653-4b11-830f-535bf44cd596.png",
      "https://cdn.ecomm.ui.com/products/9f693a84-9dcb-452f-889a-faba29ac4b73/b6cc0aef-58be-4022-92d3-5c579f9ac280.png",
      "https://cdn.ecomm.ui.com/products/9f693a84-9dcb-452f-889a-faba29ac4b73/db9ea71f-4a7e-4589-b415-4c7fe245846a.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:39.403259+00:00",
    created_at: "2025-02-19T00:35:57.645941+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "5900b006-06d5-4f47-897a-af97a6ceabe8",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Enterprise 8 PoE",
    model: "USW-Enterprise-8-PoE (120W)",
    description: "An 8-port, Layer 3 switch with 2.5 GbE PoE+ output.",
    price: 479,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-enterprise-8-poe",
    image_url:
      "https://cdn.ecomm.ui.com/products/f9af6d87-2024-475d-a062-2038566ac850/c4edae77-adc5-4bbb-a3ec-790c5ba3e379.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/f9af6d87-2024-475d-a062-2038566ac850/c4edae77-adc5-4bbb-a3ec-790c5ba3e379.png",
      "https://cdn.ecomm.ui.com/products/f9af6d87-2024-475d-a062-2038566ac850/cedba9ea-0f77-49f9-9b83-08afab851095.png",
      "https://cdn.ecomm.ui.com/products/f9af6d87-2024-475d-a062-2038566ac850/306d942b-254e-4287-88b8-b715ff356d2e.png",
      "https://cdn.ecomm.ui.com/products/f9af6d87-2024-475d-a062-2038566ac850/c29a67de-1ccc-4d04-9525-1efe768773c9.png",
      "https://cdn.ecomm.ui.com/products/f9af6d87-2024-475d-a062-2038566ac850/2ada4064-ce3e-4b5a-9305-ec6c84902b86.png",
      "https://cdn.ecomm.ui.com/products/f9af6d87-2024-475d-a062-2038566ac850/8f801083-fc95-482b-9525-2b29df67666f.png",
      "https://cdn.ecomm.ui.com/products/f9af6d87-2024-475d-a062-2038566ac850/ea85d516-90f6-437f-9030-c1ea655cf4c6.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:41.060507+00:00",
    created_at: "2025-02-19T00:35:58.262844+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "2a36c3a5-901b-4f8b-a3d3-a6fb47ea7d7f",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "EnterpriseXG 24",
    model: "USW-EnterpriseXG-24",
    description:
      "A 24-port, Layer 3 switch capable of supporting high-capacity 10 GbE RJ45 and 25G SFP28 connections.",
    price: 1299,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-enterprisexg-24",
    image_url:
      "https://cdn.ecomm.ui.com/products/de04b908-bb34-45dd-834f-9b081429aa07/870f1265-84f2-48e9-88a6-e362e2df375e.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/de04b908-bb34-45dd-834f-9b081429aa07/870f1265-84f2-48e9-88a6-e362e2df375e.png",
      "https://cdn.ecomm.ui.com/products/de04b908-bb34-45dd-834f-9b081429aa07/60e98b5c-dc90-4816-84ba-728119f08d11.png",
      "https://cdn.ecomm.ui.com/products/de04b908-bb34-45dd-834f-9b081429aa07/4913d6a4-7deb-4069-b22d-b7cec0d1d28c.png",
      "https://cdn.ecomm.ui.com/products/de04b908-bb34-45dd-834f-9b081429aa07/168a8587-80aa-4d14-b4f4-48519a08560c.png",
      "https://cdn.ecomm.ui.com/products/de04b908-bb34-45dd-834f-9b081429aa07/b9ef83b7-eb46-4423-a054-0db9ad28a34d.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:42.50516+00:00",
    created_at: "2025-02-19T00:35:57.931006+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "54601e21-2257-4de0-bef5-4ca47a4354f7",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Standard 16 PoE",
    model: "USW-16-POE (42W)",
    description:
      "A 16-port, Layer 2 PoE switch with a silent, fanless cooling system.",
    price: 299,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-16-poe",
    image_url:
      "https://cdn.ecomm.ui.com/products/ab04370e-f45d-4651-828c-b290de8df45b/f854c366-9793-4016-a449-d2647f0a9b44.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/ab04370e-f45d-4651-828c-b290de8df45b/f854c366-9793-4016-a449-d2647f0a9b44.png",
      "https://cdn.ecomm.ui.com/products/ab04370e-f45d-4651-828c-b290de8df45b/4998aa69-bcdd-4bab-bd89-ed3e6d636848.png",
      "https://cdn.ecomm.ui.com/products/ab04370e-f45d-4651-828c-b290de8df45b/df6b8609-b410-45b7-bff1-c6598aa92499.png",
      "https://cdn.ecomm.ui.com/products/ab04370e-f45d-4651-828c-b290de8df45b/967e1a37-a5f1-4d10-ada5-662bf7736a59.png",
      "https://cdn.ecomm.ui.com/products/ab04370e-f45d-4651-828c-b290de8df45b/3146011d-8e4c-4138-8950-4cbefa3d48e3.png",
      "https://cdn.ecomm.ui.com/products/ab04370e-f45d-4651-828c-b290de8df45b/19d182c8-dae9-4a17-b41c-6d5967187eb2.png",
      "https://cdn.ecomm.ui.com/products/ab04370e-f45d-4651-828c-b290de8df45b/3707b572-ede9-449a-a093-d4163b4d6b34.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:48.761799+00:00",
    created_at: "2025-02-19T00:35:57.884794+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "b557856f-1dab-4f5e-a738-9ba84a005ca8",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Flex 2.5G",
    model: "USW-Flex-2.5G-8",
    description:
      "Flexible, 8-port 2.5 GbE switch with a 10 GbE RJ45/SFP+ combination uplink port that can be powered with a USB-C or PoE+ adapter.",
    price: 159,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-flex-2-5g-8",
    image_url:
      "https://cdn.ecomm.ui.com/products/1d18e099-3be0-4f49-8126-5ade125543b5/90bbdea2-078a-41dd-aa89-6ae4b4e5c3b1.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/1d18e099-3be0-4f49-8126-5ade125543b5/90bbdea2-078a-41dd-aa89-6ae4b4e5c3b1.png",
      "https://cdn.ecomm.ui.com/products/1d18e099-3be0-4f49-8126-5ade125543b5/24e9b034-cb9c-4048-9f69-7810ebf1700e.png",
      "https://cdn.ecomm.ui.com/products/1d18e099-3be0-4f49-8126-5ade125543b5/ae53e608-4328-4780-9487-4269cd1f5f45.png",
      "https://cdn.ecomm.ui.com/products/1d18e099-3be0-4f49-8126-5ade125543b5/65a50a93-4949-4c83-8292-7070d9244171.png",
      "https://cdn.ecomm.ui.com/products/1d18e099-3be0-4f49-8126-5ade125543b5/94ab2579-1e18-46ef-973c-237796b4a291.png",
      "https://cdn.ecomm.ui.com/products/1d18e099-3be0-4f49-8126-5ade125543b5/15d6ab0c-59f1-408b-bdcd-5816f2d0c959.png",
      "https://cdn.ecomm.ui.com/products/1d18e099-3be0-4f49-8126-5ade125543b5/f9206738-2c62-4963-8033-e2c314384455.png",
      "https://cdn.ecomm.ui.com/products/1d18e099-3be0-4f49-8126-5ade125543b5/2814c96d-cc83-4748-86ce-61059b53b12d.png",
      "https://cdn.ecomm.ui.com/products/1d18e099-3be0-4f49-8126-5ade125543b5/4d24d374-fb2d-4bba-bfd7-794e93b44a32.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:56.086587+00:00",
    created_at: "2025-02-19T00:35:58.417397+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "329603e5-fff9-4721-a0fb-d6a04bc48e0a",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Hi-Capacity Aggregation",
    model: "USW-Pro-Aggregation",
    description:
      "A 32-port, Layer 3 switch made for high-capacity 10G SFP+ and 25G SFP28 connections.",
    price: 899,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-pro-aggregation",
    image_url:
      "https://cdn.ecomm.ui.com/products/35879d83-6169-4d6b-abf6-d3b98b1e8367/6e96315d-1967-44f6-91eb-4b39ac34d7d6.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/35879d83-6169-4d6b-abf6-d3b98b1e8367/6e96315d-1967-44f6-91eb-4b39ac34d7d6.png",
      "https://cdn.ecomm.ui.com/products/35879d83-6169-4d6b-abf6-d3b98b1e8367/bd61e96f-c136-42e8-bf94-4c130237bc51.png",
      "https://cdn.ecomm.ui.com/products/35879d83-6169-4d6b-abf6-d3b98b1e8367/69f12d23-12a4-4094-a0a8-4cd5bfd1440a.png",
      "https://cdn.ecomm.ui.com/products/35879d83-6169-4d6b-abf6-d3b98b1e8367/699231e7-5ef6-4198-a559-415f6de37403.png",
      "https://cdn.ecomm.ui.com/products/35879d83-6169-4d6b-abf6-d3b98b1e8367/23985b97-4807-465e-b375-2a5c7a969e63.png",
      "https://cdn.ecomm.ui.com/products/35879d83-6169-4d6b-abf6-d3b98b1e8367/13e2862f-150d-4a3f-8a6a-28d0d601dd55.png",
      "https://cdn.ecomm.ui.com/products/35879d83-6169-4d6b-abf6-d3b98b1e8367/c0bd5085-772e-45db-8868-3d04b807e150.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:44.527751+00:00",
    created_at: "2025-02-19T00:35:58.025612+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "08ecf338-ea7a-4124-b9ce-d8d59c07a770",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Lite 16 PoE",
    model: "USW-Lite-16-PoE (45W)",
    description:
      "A wall-mountable, 16-port, Layer 2 PoE switch with a fanless cooling system.",
    price: 199,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-lite-16-poe",
    image_url:
      "https://cdn.ecomm.ui.com/products/e726eace-a772-4f12-bfad-c68baf20e51f/2c19cf2c-58c2-420a-bb8b-27c310f0a5b2.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/e726eace-a772-4f12-bfad-c68baf20e51f/2c19cf2c-58c2-420a-bb8b-27c310f0a5b2.png",
      "https://cdn.ecomm.ui.com/products/e726eace-a772-4f12-bfad-c68baf20e51f/55048584-c2d8-4d4b-a274-d8cff40b90ee.png",
      "https://cdn.ecomm.ui.com/products/e726eace-a772-4f12-bfad-c68baf20e51f/9b7675d4-fc09-4f80-89a7-7b343f6b4caf.png",
      "https://cdn.ecomm.ui.com/products/e726eace-a772-4f12-bfad-c68baf20e51f/1c3a6e5c-76e5-44a0-b58f-65acee5c7f1c.png",
      "https://cdn.ecomm.ui.com/products/e726eace-a772-4f12-bfad-c68baf20e51f/0eebb92b-e877-4f83-8355-0764a8271132.png",
      "https://cdn.ecomm.ui.com/products/e726eace-a772-4f12-bfad-c68baf20e51f/4d202814-9caf-49ef-a753-75eee6e4a8e9.png",
      "https://cdn.ecomm.ui.com/products/e726eace-a772-4f12-bfad-c68baf20e51f/dea75ed7-8d78-4151-b97b-9572fe79f92a.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:45.920117+00:00",
    created_at: "2025-02-19T00:35:58.117282+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "e5806e84-34b9-43b2-ab92-9324c50c27db",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Lite 8 PoE",
    model: "USW-Lite-8-PoE (52W)",
    description:
      "An 8-port, Layer 2 PoE switch supporting silent fanless cooling.",
    price: 109,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-lite-8-poe",
    image_url:
      "https://cdn.ecomm.ui.com/products/75c44878-4e73-446e-8e86-f207db6b2b7c/2116b3a2-bfcf-40f7-a8f2-1f56915959b5.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/75c44878-4e73-446e-8e86-f207db6b2b7c/2116b3a2-bfcf-40f7-a8f2-1f56915959b5.png",
      "https://cdn.ecomm.ui.com/products/75c44878-4e73-446e-8e86-f207db6b2b7c/e61bdfe6-559e-45dd-9c1b-dd07678bc2f8.png",
      "https://cdn.ecomm.ui.com/products/75c44878-4e73-446e-8e86-f207db6b2b7c/d28bca76-5a63-4ae0-b9a7-7d6be15d891a.png",
      "https://cdn.ecomm.ui.com/products/75c44878-4e73-446e-8e86-f207db6b2b7c/22680d40-b87c-46cc-988c-69a1f40da6e7.png",
      "https://cdn.ecomm.ui.com/products/75c44878-4e73-446e-8e86-f207db6b2b7c/93d84271-b834-4591-8989-fceb839fcc1a.png",
      "https://cdn.ecomm.ui.com/products/75c44878-4e73-446e-8e86-f207db6b2b7c/f4fee213-046c-4ee0-b12c-c168069c5c84.png",
      "https://cdn.ecomm.ui.com/products/75c44878-4e73-446e-8e86-f207db6b2b7c/5731695f-b587-490f-b0dd-0f9868e17570.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:47.183718+00:00",
    created_at: "2025-02-19T00:35:58.162581+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "3ac8e88b-6cb5-4621-91e1-653334adb193",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Pro 8 PoE",
    model: "USW-Pro-8-PoE (120W)",
    description: "An 8-port, Layer 3 switch with PoE+ and PoE++ output.",
    price: 349,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-pro-8-poe",
    image_url:
      "https://cdn.ecomm.ui.com/products/37c8c814-f786-4f8a-ac58-96525f22e029/d3cc5d54-2da0-46d9-b683-2a0ff95bd3ff.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/37c8c814-f786-4f8a-ac58-96525f22e029/d3cc5d54-2da0-46d9-b683-2a0ff95bd3ff.png",
      "https://cdn.ecomm.ui.com/products/37c8c814-f786-4f8a-ac58-96525f22e029/515ee771-18be-4988-a3e1-4bfd3a46f760.png",
      "https://cdn.ecomm.ui.com/products/37c8c814-f786-4f8a-ac58-96525f22e029/efd44a70-707b-41d6-956b-7a56d16b18f0.png",
      "https://cdn.ecomm.ui.com/products/37c8c814-f786-4f8a-ac58-96525f22e029/ffd2243e-9805-49e5-b68b-d037fa08df2d.png",
      "https://cdn.ecomm.ui.com/products/37c8c814-f786-4f8a-ac58-96525f22e029/7947ca7c-b761-4979-a8db-b1ee3070dc0b.png",
      "https://cdn.ecomm.ui.com/products/37c8c814-f786-4f8a-ac58-96525f22e029/ecc136d1-483f-4515-80dc-b3b0a70fa9b0.png",
      "https://cdn.ecomm.ui.com/products/37c8c814-f786-4f8a-ac58-96525f22e029/c1ed32f6-279e-43b3-947c-78820df2a2b3.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:50.787079+00:00",
    created_at: "2025-02-19T00:35:58.313633+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "b0a8101d-a4ad-465c-aada-64a1e4023371",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Flex Mini",
    model: "USW-Flex-Mini",
    description:
      "A compact, 5-port, Layer 2 switch that can be powered with PoE or a 5V USB-C adapter.",
    price: 29,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-flex-mini",
    image_url:
      "https://cdn.ecomm.ui.com/products/5a176b22-af34-40f2-820c-958610df1825/753f26b0-1277-48a6-9b59-1b89e9ce8ff9.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/5a176b22-af34-40f2-820c-958610df1825/753f26b0-1277-48a6-9b59-1b89e9ce8ff9.png",
      "https://cdn.ecomm.ui.com/products/5a176b22-af34-40f2-820c-958610df1825/3df65693-2217-4590-9369-c322edf57838.png",
      "https://cdn.ecomm.ui.com/products/5a176b22-af34-40f2-820c-958610df1825/0974d3d7-e9b2-4112-9788-fc7955fe4aad.png",
      "https://cdn.ecomm.ui.com/products/5a176b22-af34-40f2-820c-958610df1825/ad839a32-22c8-4bb9-bf31-8d55411519ac.png",
      "https://cdn.ecomm.ui.com/products/5a176b22-af34-40f2-820c-958610df1825/26ef5780-68de-4676-b5d3-da7fe622b0c0.png",
      "https://cdn.ecomm.ui.com/products/5a176b22-af34-40f2-820c-958610df1825/5983a53a-ea8a-4a27-8246-b46505c8bf40.png",
      "https://cdn.ecomm.ui.com/products/5a176b22-af34-40f2-820c-958610df1825/88f1fea7-5254-459e-b4c4-979ea2992736.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:52.219126+00:00",
    created_at: "2025-02-19T00:35:58.506524+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "eaad7d43-7c49-4116-8fe1-556749ddf448",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Dream Machine Special Edition",
    model: "UDM-SE (180W)",
    description:
      "10G Cloud Gateway with 100+ UniFi device / 1,000+ client support, 3.5 Gbps IPS routing, and built-in PoE switching.",
    price: 499,
    product_url:
      "https://store.ui.com/us/en/category/all-cloud-gateways/products/udm-se",
    image_url:
      "https://cdn.ecomm.ui.com/products/1b6fcc08-a6b8-4496-a831-6125a47c412f/c1d1e0e0-4ec6-4760-9bc2-81cdfdf3eaa5.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/1b6fcc08-a6b8-4496-a831-6125a47c412f/c1d1e0e0-4ec6-4760-9bc2-81cdfdf3eaa5.png",
      "https://cdn.ecomm.ui.com/products/1b6fcc08-a6b8-4496-a831-6125a47c412f/522e6fc0-1cb4-4b32-afd5-2495c26625fc.png",
      "https://cdn.ecomm.ui.com/products/1b6fcc08-a6b8-4496-a831-6125a47c412f/148125d6-5d75-44f5-b106-18f5fedf7c7f.png",
      "https://cdn.ecomm.ui.com/products/1b6fcc08-a6b8-4496-a831-6125a47c412f/2794bdc2-2d4a-4996-9194-2e3436d38edd.png",
      "https://cdn.ecomm.ui.com/products/1b6fcc08-a6b8-4496-a831-6125a47c412f/80b68060-4c80-4ece-8d44-0a86befdb022.png",
      "https://cdn.ecomm.ui.com/products/1b6fcc08-a6b8-4496-a831-6125a47c412f/9eac9052-124b-4bfa-9e9f-a19f803d2f9a.png",
      "https://cdn.ecomm.ui.com/products/1b6fcc08-a6b8-4496-a831-6125a47c412f/d7a01b05-6a80-410d-9989-2a5190cbf060.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:57.59819+00:00",
    created_at: "2025-02-19T01:11:00.515869+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "b0b9e9f9-2dc9-4280-a749-346335df1f1a",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Cloud Gateway Max",
    model: "UCG-Max",
    description:
      "Compact 2.5G Cloud Gateway with 30+ UniFi device / 300+ client support, 1.5 Gbps IPS routing, and selectable NVR storage.",
    price: 279,
    product_url:
      "https://store.ui.com/us/en/category/cloud-gateways-compact/collections/cloud-gateway-max",
    image_url:
      "https://cdn.ecomm.ui.com/products/8cca3680-14a6-496a-af7d-beba49cea3f2/c0131143-50cb-4ce2-b9ce-4dd61820302c.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/8cca3680-14a6-496a-af7d-beba49cea3f2/c0131143-50cb-4ce2-b9ce-4dd61820302c.png",
      "https://cdn.ecomm.ui.com/products/8cca3680-14a6-496a-af7d-beba49cea3f2/204868ba-fead-4637-a704-b1d244e6e53d.png",
      "https://cdn.ecomm.ui.com/products/8cca3680-14a6-496a-af7d-beba49cea3f2/bb7df0db-64e2-4906-9b15-816d1823ac05.png",
      "https://cdn.ecomm.ui.com/products/8cca3680-14a6-496a-af7d-beba49cea3f2/310f5637-b61d-49fd-b69f-b7dba78fc53a.png",
      "https://cdn.ecomm.ui.com/products/8cca3680-14a6-496a-af7d-beba49cea3f2/a2555f45-4010-4f87-81c7-34baf1881ea1.png",
      "https://cdn.ecomm.ui.com/products/8cca3680-14a6-496a-af7d-beba49cea3f2/0faec6ff-950a-471d-936a-3c4c753f510a.png",
      "https://cdn.ecomm.ui.com/products/8cca3680-14a6-496a-af7d-beba49cea3f2/88790c21-a339-47a5-b859-e57bafa5a4b1.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:58.963181+00:00",
    created_at: "2025-02-19T01:11:00.555034+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "2b3ec0df-886f-479f-a6d2-d9df9cad64e1",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Mission Critical",
    model: "USW-Mission-Critical (120W)",
    description:
      "A switch with an integrated 368Wh lithium-ion battery capable of providing uninterruptible PoE to 8 devices.",
    price: 999,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-mission-critical",
    image_url:
      "https://cdn.ecomm.ui.com/products/0a2a7ba1-12c3-4736-a31d-ed9a0e9f44d1/d2bf12ea-da18-4b75-a9bf-e42fe3bc3472.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/0a2a7ba1-12c3-4736-a31d-ed9a0e9f44d1/d2bf12ea-da18-4b75-a9bf-e42fe3bc3472.png",
      "https://cdn.ecomm.ui.com/products/0a2a7ba1-12c3-4736-a31d-ed9a0e9f44d1/ab68087e-3470-4a5f-8a45-6306793da183.png",
      "https://cdn.ecomm.ui.com/products/0a2a7ba1-12c3-4736-a31d-ed9a0e9f44d1/08f7fc34-f02b-4cfa-9733-ae7e11e7321c.png",
      "https://cdn.ecomm.ui.com/products/0a2a7ba1-12c3-4736-a31d-ed9a0e9f44d1/1c888921-e70c-4402-8ce6-f1453c5a23f6.png",
      "https://cdn.ecomm.ui.com/products/0a2a7ba1-12c3-4736-a31d-ed9a0e9f44d1/1b247747-6069-4542-94f1-e12471680043.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:33.841595+00:00",
    created_at: "2025-02-19T00:35:59.038337+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "dafec1cf-4ad7-46c2-a3e1-c6078bf7a8de",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Flex Utility",
    model: "USW-Flex-Utility",
    description:
      "The Switch Flex Utility is an outdoor weatherproof enclosure designed for use with the Switch Flex.",
    price: 49,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-flexutility",
    image_url:
      "https://cdn.ecomm.ui.com/products/a2a40116-c5ef-426a-a10a-a9eef2adebd9/2cbf0202-b44f-44ab-b035-9c9550bed660.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/a2a40116-c5ef-426a-a10a-a9eef2adebd9/2cbf0202-b44f-44ab-b035-9c9550bed660.png",
      "https://cdn.ecomm.ui.com/products/a2a40116-c5ef-426a-a10a-a9eef2adebd9/610f4198-18d5-4ed8-9e27-d27190b819a3.png",
      "https://cdn.ecomm.ui.com/products/a2a40116-c5ef-426a-a10a-a9eef2adebd9/769a4f3a-3927-492d-8da9-ac2008dabfae.png",
      "https://cdn.ecomm.ui.com/products/a2a40116-c5ef-426a-a10a-a9eef2adebd9/335ce12d-46be-4cda-bd6f-a1883b01eecc.png",
      "https://cdn.ecomm.ui.com/products/a2a40116-c5ef-426a-a10a-a9eef2adebd9/8a3fcb35-7a92-452b-ad3c-ab8949cc05ad.png",
      "https://cdn.ecomm.ui.com/products/a2a40116-c5ef-426a-a10a-a9eef2adebd9/5193881a-8b2b-4036-87ce-e5e9aaca2092.png",
      "https://cdn.ecomm.ui.com/products/a2a40116-c5ef-426a-a10a-a9eef2adebd9/6f2ee3ac-d165-4c47-8348-4c940d5280a5.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:48:53.582925+00:00",
    created_at: "2025-02-19T00:35:58.592831+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "8a9711f7-3012-44f3-a590-b68d45fcdd56",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Pro 24",
    model: "USW-Pro-24",
    description:
      "A 24-port, Layer 3 switch supporting 10G SFP+ connections with fanless cooling.",
    price: 399,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-pro-24",
    image_url:
      "https://cdn.ecomm.ui.com/products/2315330e-7a37-4c6b-87df-0743d04e87ca/d216a09f-50cb-4ffe-9f17-a004d1b43923.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/2315330e-7a37-4c6b-87df-0743d04e87ca/d216a09f-50cb-4ffe-9f17-a004d1b43923.png",
      "https://cdn.ecomm.ui.com/products/2315330e-7a37-4c6b-87df-0743d04e87ca/ac5cf87c-a13b-429f-80dd-74e21b11ea61.png",
      "https://cdn.ecomm.ui.com/products/2315330e-7a37-4c6b-87df-0743d04e87ca/305b9dc2-7ea2-4cfc-9b8c-41c13b00dc88.png",
      "https://cdn.ecomm.ui.com/products/2315330e-7a37-4c6b-87df-0743d04e87ca/74f90dc8-4a61-433c-ab26-8e919fc02122.png",
      "https://cdn.ecomm.ui.com/products/2315330e-7a37-4c6b-87df-0743d04e87ca/fbc06fbf-92c9-419f-bf41-1f5ec23b8892.png",
      "https://cdn.ecomm.ui.com/products/2315330e-7a37-4c6b-87df-0743d04e87ca/6246a08b-95ab-46b6-8499-eea37202d96e.png",
      "https://cdn.ecomm.ui.com/products/2315330e-7a37-4c6b-87df-0743d04e87ca/e9565aa1-6950-41a8-b73b-1a41411bf172.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:05.690791+00:00",
    created_at: "2025-02-19T00:35:58.905673+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "7648f5fc-a0ab-4281-bf26-5d9a513032d2",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Pro Max 16",
    model: "USW-Pro-Max-16",
    description:
      "A 16-port, Layer 3 Etherlighting™ switch 2.5 GbE and versatile mounting options.",
    price: 279,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-pro-max-16",
    image_url:
      "https://cdn.ecomm.ui.com/products/065e9d0f-19c7-4b9e-8b36-8e900363af80/e011cde3-092b-48b1-a62e-f29f880a904f.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/065e9d0f-19c7-4b9e-8b36-8e900363af80/e011cde3-092b-48b1-a62e-f29f880a904f.png",
      "https://cdn.ecomm.ui.com/products/065e9d0f-19c7-4b9e-8b36-8e900363af80/2fa8a584-8dfe-4179-a327-dd8696ad7c3c.png",
      "https://cdn.ecomm.ui.com/products/065e9d0f-19c7-4b9e-8b36-8e900363af80/91270f01-f32a-4e5d-8691-f87df0320bf1.png",
      "https://cdn.ecomm.ui.com/products/065e9d0f-19c7-4b9e-8b36-8e900363af80/50c3f3b4-f1e9-4f22-bbbc-ca980f775099.png",
      "https://cdn.ecomm.ui.com/products/065e9d0f-19c7-4b9e-8b36-8e900363af80/d228aa18-2f2b-4618-86c7-bde2ce384049.png",
      "https://cdn.ecomm.ui.com/products/065e9d0f-19c7-4b9e-8b36-8e900363af80/a4cf4d60-567b-4967-ba14-78af9c90de49.png",
      "https://cdn.ecomm.ui.com/products/065e9d0f-19c7-4b9e-8b36-8e900363af80/a5cbde34-9221-4815-8b96-f88aaebe3f05.png",
      "https://cdn.ecomm.ui.com/products/065e9d0f-19c7-4b9e-8b36-8e900363af80/8446c229-22be-494e-ab54-7a2c99f632a2.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:11.416505+00:00",
    created_at: "2025-02-19T00:35:58.816595+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "bd404be5-858b-4c39-8249-c891aa21f8fe",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Cloud Gateway Ultra",
    model: "UCG-Ultra",
    description:
      "Compact Cloud Gateway with 30+ UniFi device / 300+ client support, 1 Gbps IPS routing, and multi-WAN load balancing.",
    price: 129,
    product_url:
      "https://store.ui.com/us/en/category/all-cloud-gateways/products/ucg-ultra",
    image_url:
      "https://cdn.ecomm.ui.com/products/8d2d9e4b-89f3-49a1-9c17-5d774c0067b4/62a5adb2-e21a-4b3d-bad8-7485ddb87256.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/8d2d9e4b-89f3-49a1-9c17-5d774c0067b4/62a5adb2-e21a-4b3d-bad8-7485ddb87256.png",
      "https://cdn.ecomm.ui.com/products/8d2d9e4b-89f3-49a1-9c17-5d774c0067b4/848cae77-52f6-41ff-ad75-f9b07afb4f3f.png",
      "https://cdn.ecomm.ui.com/products/8d2d9e4b-89f3-49a1-9c17-5d774c0067b4/e1f7fa88-79c8-45ec-a234-bdf069c546ad.png",
      "https://cdn.ecomm.ui.com/products/8d2d9e4b-89f3-49a1-9c17-5d774c0067b4/58a9e41f-6c51-4f1b-ab15-28ca7f6cb06b.png",
      "https://cdn.ecomm.ui.com/products/8d2d9e4b-89f3-49a1-9c17-5d774c0067b4/698b92a2-ec1f-4860-82f2-104cab584cb1.png",
      "https://cdn.ecomm.ui.com/products/8d2d9e4b-89f3-49a1-9c17-5d774c0067b4/d000c34d-2259-4d49-ba90-8126e5dde871.png",
      "https://cdn.ecomm.ui.com/products/8d2d9e4b-89f3-49a1-9c17-5d774c0067b4/be1e147d-b6e5-46c4-815a-35bc8bf9346a.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:00.434707+00:00",
    created_at: "2025-02-19T01:11:00.595429+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "b11a0d50-ef8e-42a0-94c4-ba891fcb14b8",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Dream Router",
    model: "UDR (40W)",
    description:
      "Desktop UniFi Cloud Gateway with integrated WiFi 6 and PoE switching.",
    price: 199,
    product_url:
      "https://store.ui.com/us/en/category/all-cloud-gateways/products/udr",
    image_url:
      "https://cdn.ecomm.ui.com/products/60459473-c989-41db-93f2-3c0f40df84f3/c943d2a0-da2e-4ef5-8356-0bf7dc071e9e.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/60459473-c989-41db-93f2-3c0f40df84f3/c943d2a0-da2e-4ef5-8356-0bf7dc071e9e.png",
      "https://cdn.ecomm.ui.com/products/60459473-c989-41db-93f2-3c0f40df84f3/0e6828d7-04e4-4a8c-bded-40ea69f48a3f.png",
      "https://cdn.ecomm.ui.com/products/60459473-c989-41db-93f2-3c0f40df84f3/875946dd-4d91-42fa-be23-952b6339e6b7.png",
      "https://cdn.ecomm.ui.com/products/60459473-c989-41db-93f2-3c0f40df84f3/4bb7b744-5622-4d1a-98c3-13f309677b7a.png",
      "https://cdn.ecomm.ui.com/products/60459473-c989-41db-93f2-3c0f40df84f3/a81e4020-913d-4d88-a7fb-448c1120878f.png",
      "https://cdn.ecomm.ui.com/products/60459473-c989-41db-93f2-3c0f40df84f3/55fcd0c8-abc5-4637-9716-6d3fbd32fda7.png",
      "https://cdn.ecomm.ui.com/products/60459473-c989-41db-93f2-3c0f40df84f3/5f54a229-870b-469d-acc0-d1ff3209c9c5.png",
    ],
    availability: "Out of Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:01.59313+00:00",
    created_at: "2025-02-19T01:11:00.71139+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "d7185539-37da-49da-a12b-f41484f36552",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Pro Max 24",
    model: "USW-Pro-Max-24",
    description: "A 24-port, Layer 3 Etherlighting™ switch with 2.5 GbE.",
    price: 449,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-pro-max-24",
    image_url:
      "https://cdn.ecomm.ui.com/products/dd435390-1705-4159-852c-fd210b4e7c17/c81e0b84-df91-4b45-8695-bfa622812030.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/dd435390-1705-4159-852c-fd210b4e7c17/c81e0b84-df91-4b45-8695-bfa622812030.png",
      "https://cdn.ecomm.ui.com/products/dd435390-1705-4159-852c-fd210b4e7c17/c989a191-c7dd-4a81-ab6d-1aadfbbcca71.png",
      "https://cdn.ecomm.ui.com/products/dd435390-1705-4159-852c-fd210b4e7c17/593c76f6-f1c0-4134-9ecb-e0bda2a2d816.png",
      "https://cdn.ecomm.ui.com/products/dd435390-1705-4159-852c-fd210b4e7c17/daeb1847-eb44-4cf5-8ac0-e4d00a293737.png",
      "https://cdn.ecomm.ui.com/products/dd435390-1705-4159-852c-fd210b4e7c17/3fa79fc4-f63c-4df1-be13-fe865279b2e4.png",
      "https://cdn.ecomm.ui.com/products/dd435390-1705-4159-852c-fd210b4e7c17/22afd6b6-7a4d-44e2-8225-3aced22c4a69.png",
      "https://cdn.ecomm.ui.com/products/dd435390-1705-4159-852c-fd210b4e7c17/ff29eadb-ed79-4ecb-a545-344d850efc96.png",
      "https://cdn.ecomm.ui.com/products/dd435390-1705-4159-852c-fd210b4e7c17/6a61c184-4a38-4c51-8a43-2b96c9b20a5e.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:03.416589+00:00",
    created_at: "2025-02-19T00:35:58.77218+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "3a7cf3df-827a-4ffc-b99c-d3a856c0e791",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Flex 2.5G PoE",
    model: "USW-Flex-2.5G-8-PoE",
    description:
      "Flexible, 8-port 2.5 GbE PoE++ switch with a 10 GbE RJ45/SFP+ combination uplink port that can be powered with PoE+++ or an AC power adapter.",
    price: 199,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-flex-2-5g-8-poe",
    image_url:
      "https://cdn.ecomm.ui.com/products/e9d97121-f363-4261-83db-5f74e093a304/83603e2a-9610-49a1-b045-a330febff627.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/e9d97121-f363-4261-83db-5f74e093a304/83603e2a-9610-49a1-b045-a330febff627.png",
      "https://cdn.ecomm.ui.com/products/e9d97121-f363-4261-83db-5f74e093a304/4f40446a-13d6-4fa8-b15e-6f1c09be6cd3.png",
      "https://cdn.ecomm.ui.com/products/e9d97121-f363-4261-83db-5f74e093a304/fcb8b053-9cac-42cd-88ad-b3a76dec8b54.png",
      "https://cdn.ecomm.ui.com/products/e9d97121-f363-4261-83db-5f74e093a304/e2da7084-1f22-42f2-a29f-d883ab134164.png",
      "https://cdn.ecomm.ui.com/products/e9d97121-f363-4261-83db-5f74e093a304/63ddf575-1a5d-4535-b431-5c1372e37b07.png",
      "https://cdn.ecomm.ui.com/products/e9d97121-f363-4261-83db-5f74e093a304/05403282-3bfb-4e81-b548-dd467301738b.png",
      "https://cdn.ecomm.ui.com/products/e9d97121-f363-4261-83db-5f74e093a304/74eb4518-204b-427c-93f1-334cf42e610d.png",
      "https://cdn.ecomm.ui.com/products/e9d97121-f363-4261-83db-5f74e093a304/b8ab2417-65ac-4b42-898a-9ba669e176dc.png",
      "https://cdn.ecomm.ui.com/products/e9d97121-f363-4261-83db-5f74e093a304/ac3b4aac-f0a1-4680-ab5e-7bd73dde9f7c.png",
    ],
    availability: "Out of Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:22.944252+00:00",
    created_at: "2025-02-19T00:35:59.081823+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "0d6ee661-5c35-470e-ba59-222e0d5e1af7",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Flex",
    model: "USW-Flex (46W)",
    description:
      "Flexible 5-port, Layer 2 PoE switch for indoor and outdoor use, that can be powered with PoE++.",
    price: 99,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-flex",
    image_url:
      "https://cdn.ecomm.ui.com/products/c9a07d37-b390-4a5b-89c5-3cdab8e011c7/91a9d4a6-ac08-42e9-b4e5-66c54a81f4cc.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/c9a07d37-b390-4a5b-89c5-3cdab8e011c7/91a9d4a6-ac08-42e9-b4e5-66c54a81f4cc.png",
      "https://cdn.ecomm.ui.com/products/c9a07d37-b390-4a5b-89c5-3cdab8e011c7/a8cc5efd-a97d-4bf4-aec8-0102a8a31e67.png",
      "https://cdn.ecomm.ui.com/products/c9a07d37-b390-4a5b-89c5-3cdab8e011c7/2879c6a8-0149-4bfd-aeb3-ec5e04717284.png",
      "https://cdn.ecomm.ui.com/products/c9a07d37-b390-4a5b-89c5-3cdab8e011c7/b9dc2928-1bdd-49a7-a465-e2dc7ee5de97.png",
      "https://cdn.ecomm.ui.com/products/c9a07d37-b390-4a5b-89c5-3cdab8e011c7/3807e47b-0ac5-4268-b30a-b53d8aefa5de.png",
      "https://cdn.ecomm.ui.com/products/c9a07d37-b390-4a5b-89c5-3cdab8e011c7/38514b78-4bff-4007-a9ee-7ac4e93fde50.png",
      "https://cdn.ecomm.ui.com/products/c9a07d37-b390-4a5b-89c5-3cdab8e011c7/e34b0835-d041-4cc5-bfc6-e606077e02f0.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:16.388005+00:00",
    created_at: "2025-02-19T00:35:58.550968+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "d820a793-c39c-40af-819e-2eeda96f5ca6",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Pro Max 48 PoE",
    model: "USW-Pro-Max-48-PoE (720W)",
    description:
      "A 48-port, Layer 3 Etherlighting™ switch with 2.5 GbE and PoE++ output.",
    price: 1299,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-pro-max-48-poe",
    image_url:
      "https://cdn.ecomm.ui.com/products/51e22689-9b81-4717-beed-fe2c65c57362/c20ff409-f511-4a04-9bf0-200065216489.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/51e22689-9b81-4717-beed-fe2c65c57362/c20ff409-f511-4a04-9bf0-200065216489.png",
      "https://cdn.ecomm.ui.com/products/51e22689-9b81-4717-beed-fe2c65c57362/b4cec1a4-b60f-49ed-b6c0-75a675692d68.png",
      "https://cdn.ecomm.ui.com/products/51e22689-9b81-4717-beed-fe2c65c57362/836c5725-38ba-4c75-a886-a7eea87db215.png",
      "https://cdn.ecomm.ui.com/products/51e22689-9b81-4717-beed-fe2c65c57362/4f079b4f-5d0c-42b4-8c8d-5fb92460d4db.png",
      "https://cdn.ecomm.ui.com/products/51e22689-9b81-4717-beed-fe2c65c57362/949fdb99-c8cb-4dae-8097-943f59eced8d.png",
      "https://cdn.ecomm.ui.com/products/51e22689-9b81-4717-beed-fe2c65c57362/eba99181-50b1-463e-908b-6c4221f15232.png",
      "https://cdn.ecomm.ui.com/products/51e22689-9b81-4717-beed-fe2c65c57362/f94911ce-b83e-4fc6-a827-4f017a69e05c.png",
      "https://cdn.ecomm.ui.com/products/51e22689-9b81-4717-beed-fe2c65c57362/bbc5bcd5-c092-4d12-9500-9cfab40c4e0a.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:18.353857+00:00",
    created_at: "2025-02-19T00:35:57.328283+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "5aab9e06-9043-48d5-bf77-ae936b923986",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Standard 48",
    model: "USW-48",
    description:
      "A 48-port, Layer 2 switch with a silent, fanless cooling system.",
    price: 399,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-48",
    image_url:
      "https://cdn.ecomm.ui.com/products/8a649eb8-c497-4240-92ba-a5c7a792c395/b64428e9-ad30-456d-8498-969780ce5f4d.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/8a649eb8-c497-4240-92ba-a5c7a792c395/b64428e9-ad30-456d-8498-969780ce5f4d.png",
      "https://cdn.ecomm.ui.com/products/8a649eb8-c497-4240-92ba-a5c7a792c395/29693e8f-f885-40d5-8a8e-c210f4d3f743.png",
      "https://cdn.ecomm.ui.com/products/8a649eb8-c497-4240-92ba-a5c7a792c395/18862cdb-1998-45a6-847a-d6d044c20c05.png",
      "https://cdn.ecomm.ui.com/products/8a649eb8-c497-4240-92ba-a5c7a792c395/d448c274-216e-4e79-b0b6-a7e89caa9cfa.png",
      "https://cdn.ecomm.ui.com/products/8a649eb8-c497-4240-92ba-a5c7a792c395/0a285217-961f-4039-a5d9-e3b315bef905.png",
      "https://cdn.ecomm.ui.com/products/8a649eb8-c497-4240-92ba-a5c7a792c395/487edea1-337f-4c62-a2bf-89d68aa1bbe6.png",
      "https://cdn.ecomm.ui.com/products/8a649eb8-c497-4240-92ba-a5c7a792c395/6df9c337-a426-4061-82ba-002856ded200.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:07.386885+00:00",
    created_at: "2025-02-19T00:35:58.94873+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "29a530a8-0e39-4d8c-84e5-7bd583f02372",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Pro HD 24 PoE",
    model: "USW-Pro-HD-24-PoE (600W)",
    description:
      "Professional-grade, Layer 3 Etherlighting™ switch with (2) 10 GbE PoE++, (22) 2.5 GbE PoE++, and (4) 10G SFP+ ports.",
    price: 999,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-pro-hd-24-poe",
    image_url:
      "https://cdn.ecomm.ui.com/products/17d901a5-c99b-4b02-8d3b-8cb7a5da0512/a06762dd-e886-49dc-81ed-544482870ddd.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/17d901a5-c99b-4b02-8d3b-8cb7a5da0512/a06762dd-e886-49dc-81ed-544482870ddd.png",
      "https://cdn.ecomm.ui.com/products/17d901a5-c99b-4b02-8d3b-8cb7a5da0512/66088213-799b-4cf9-b819-1854e6606019.png",
      "https://cdn.ecomm.ui.com/products/17d901a5-c99b-4b02-8d3b-8cb7a5da0512/7d489d79-236c-43ca-b03c-abe80b30b03f.png",
      "https://cdn.ecomm.ui.com/products/17d901a5-c99b-4b02-8d3b-8cb7a5da0512/e14582c2-c7d7-44be-b8a0-66377b98e5cd.png",
      "https://cdn.ecomm.ui.com/products/17d901a5-c99b-4b02-8d3b-8cb7a5da0512/39388aff-e868-4995-96c2-db2bd4766113.png",
      "https://cdn.ecomm.ui.com/products/17d901a5-c99b-4b02-8d3b-8cb7a5da0512/e6211719-537c-4bb7-b8be-56834ae0154c.png",
      "https://cdn.ecomm.ui.com/products/17d901a5-c99b-4b02-8d3b-8cb7a5da0512/58606767-ed39-4fb6-aedf-fc3c7dca303f.png",
      "https://cdn.ecomm.ui.com/products/17d901a5-c99b-4b02-8d3b-8cb7a5da0512/ca8ba6f0-e28a-4821-bae6-5d9dfe616a1d.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:20.502318+00:00",
    created_at: "2025-02-19T00:35:57.465538+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "b67ef96c-e48f-4ebe-87a6-d9fe24c5f2d5",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Enterprise Fortress Gateway",
    model: "EFG",
    description:
      "25G Cloud Gateway with 500+ UniFi device / 5,000+ client support, 12.5 Gbps IPS routing, and complete high availability.",
    price: 1999,
    product_url:
      "https://store.ui.com/us/en/category/all-cloud-gateways/products/efg",
    image_url:
      "https://cdn.ecomm.ui.com/products/65adb8bd-c318-45f9-8b9f-9c15fb025ec2/f5fceaa8-a5aa-4906-b86e-1754d66aad70.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/65adb8bd-c318-45f9-8b9f-9c15fb025ec2/f5fceaa8-a5aa-4906-b86e-1754d66aad70.png",
      "https://cdn.ecomm.ui.com/products/65adb8bd-c318-45f9-8b9f-9c15fb025ec2/f2057450-0b8e-452a-a6c4-6e7284c4c758.png",
      "https://cdn.ecomm.ui.com/products/65adb8bd-c318-45f9-8b9f-9c15fb025ec2/af861e3e-6af0-462e-a4d2-ba6ed20e251b.png",
      "https://cdn.ecomm.ui.com/products/65adb8bd-c318-45f9-8b9f-9c15fb025ec2/efca2a58-efe3-462e-b3fe-167cc724057a.png",
      "https://cdn.ecomm.ui.com/products/65adb8bd-c318-45f9-8b9f-9c15fb025ec2/1ced1235-27de-49b9-8438-550fc637eba3.png",
      "https://cdn.ecomm.ui.com/products/65adb8bd-c318-45f9-8b9f-9c15fb025ec2/e4c0094d-5c5b-4a05-b214-42aaf5860b08.png",
      "https://cdn.ecomm.ui.com/products/65adb8bd-c318-45f9-8b9f-9c15fb025ec2/b3ce34ed-1276-4f35-86d2-fd91bc75b2a6.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:35.655124+00:00",
    created_at: "2025-02-19T01:11:00.391912+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "460cdd13-d5ac-42bb-b535-3ac605f7a6d7",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Dream Machine Pro Max",
    model: "UDM-Pro-Max",
    description:
      "10G Cloud Gateway with 200+ UniFi device / 2,000+ client support, 5 Gbps IPS routing, and redundant NVR storage.",
    price: 599,
    product_url:
      "https://store.ui.com/us/en/category/all-cloud-gateways/products/udm-pro-max",
    image_url:
      "https://cdn.ecomm.ui.com/products/401190d7-6a49-4c2e-bef1-7fe087d2b6b6/09bad3e9-2d83-4b7c-8940-65174540174c.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/401190d7-6a49-4c2e-bef1-7fe087d2b6b6/09bad3e9-2d83-4b7c-8940-65174540174c.png",
      "https://cdn.ecomm.ui.com/products/401190d7-6a49-4c2e-bef1-7fe087d2b6b6/a4c478f3-ef78-44e9-8574-f730a9e60ba1.png",
      "https://cdn.ecomm.ui.com/products/401190d7-6a49-4c2e-bef1-7fe087d2b6b6/4b982f0e-b292-4724-a388-cc7a18b36448.png",
      "https://cdn.ecomm.ui.com/products/401190d7-6a49-4c2e-bef1-7fe087d2b6b6/1ef5ff78-b149-4c3f-92cf-68138d0174dc.png",
      "https://cdn.ecomm.ui.com/products/401190d7-6a49-4c2e-bef1-7fe087d2b6b6/a273e60f-a68d-42c7-980b-eed0d1e7510b.png",
      "https://cdn.ecomm.ui.com/products/401190d7-6a49-4c2e-bef1-7fe087d2b6b6/341ef868-42dd-45f0-8ea8-baf43f3184f4.png",
      "https://cdn.ecomm.ui.com/products/401190d7-6a49-4c2e-bef1-7fe087d2b6b6/16b89ca0-f412-4da7-8c17-f33309276743.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:37.389801+00:00",
    created_at: "2025-02-19T01:11:00.434318+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "3435e02d-0691-4792-9ef9-e9675ebf990f",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Standard 48 PoE",
    model: "USW-48-POE (195W)",
    description:
      "A 48-port, Layer 2 PoE switch with a silent, fanless cooling system.",
    price: 589,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-48-poe",
    image_url:
      "https://cdn.ecomm.ui.com/products/147e90c2-da47-44ad-ad19-b98e223cb54b/0c8bbd9c-1abd-40c5-8130-4403da88b4cc.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/147e90c2-da47-44ad-ad19-b98e223cb54b/0c8bbd9c-1abd-40c5-8130-4403da88b4cc.png",
      "https://cdn.ecomm.ui.com/products/147e90c2-da47-44ad-ad19-b98e223cb54b/b3589855-825a-45e1-b933-a462728264f2.png",
      "https://cdn.ecomm.ui.com/products/147e90c2-da47-44ad-ad19-b98e223cb54b/9206ca50-0940-46d6-847f-84297cb1e73e.png",
      "https://cdn.ecomm.ui.com/products/147e90c2-da47-44ad-ad19-b98e223cb54b/f1c950ab-cb4f-4705-a4d0-a6b979b03a14.png",
      "https://cdn.ecomm.ui.com/products/147e90c2-da47-44ad-ad19-b98e223cb54b/06ae2f0c-0934-45f0-95d1-d39de484c8ab.png",
      "https://cdn.ecomm.ui.com/products/147e90c2-da47-44ad-ad19-b98e223cb54b/d999b6a6-4c84-456d-a39a-cecee65b58a5.png",
      "https://cdn.ecomm.ui.com/products/147e90c2-da47-44ad-ad19-b98e223cb54b/cb9f80e7-905e-4fff-b0cf-e534f8a98aba.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:27.317252+00:00",
    created_at: "2025-02-19T00:35:57.686542+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "5dbb0cb6-f617-4085-b3a7-21065ffae9e9",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Pro Max 16 PoE",
    model: "USW-Pro-Max-16-PoE (180W)",
    description:
      "A 16-port, Layer 3 Etherlighting™ switch with 2.5 GbE, PoE++ output, and versatile mounting options.",
    price: 399,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-pro-max-16-poe",
    image_url:
      "https://cdn.ecomm.ui.com/products/0694226c-9791-4d7e-9fb1-d98c91fe3fda/e05da28a-dea5-43dc-8dee-d1d00d664229.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/0694226c-9791-4d7e-9fb1-d98c91fe3fda/e05da28a-dea5-43dc-8dee-d1d00d664229.png",
      "https://cdn.ecomm.ui.com/products/0694226c-9791-4d7e-9fb1-d98c91fe3fda/648bafeb-1353-4718-8e3f-31a6cb8045a8.png",
      "https://cdn.ecomm.ui.com/products/0694226c-9791-4d7e-9fb1-d98c91fe3fda/08ab53fd-74ff-405c-b92e-def2b13d7e4e.png",
      "https://cdn.ecomm.ui.com/products/0694226c-9791-4d7e-9fb1-d98c91fe3fda/4afe23f7-77b7-4003-96d9-b5e6300a3864.png",
      "https://cdn.ecomm.ui.com/products/0694226c-9791-4d7e-9fb1-d98c91fe3fda/1a1fa09b-4283-427d-a095-6da7b683fcd8.png",
      "https://cdn.ecomm.ui.com/products/0694226c-9791-4d7e-9fb1-d98c91fe3fda/9681fca7-d352-437f-8c6a-7972d04d8d20.png",
      "https://cdn.ecomm.ui.com/products/0694226c-9791-4d7e-9fb1-d98c91fe3fda/a4433c3d-db6e-42c7-ac3d-81e83c634795.png",
      "https://cdn.ecomm.ui.com/products/0694226c-9791-4d7e-9fb1-d98c91fe3fda/92128604-2cb1-4122-bde5-3b27e894190d.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:29.369234+00:00",
    created_at: "2025-02-19T00:35:58.206473+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "51d477f8-0ed0-46b3-bb87-ef5b710c7750",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Flex 10 GbE",
    model: "USW-Flex-XG",
    description:
      "A compact, 5-port, Layer 2 switch that supports 10 GbE speeds and can be powered with PoE or a 5V USB-C adapter.",
    price: 299,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-flex-xg",
    image_url:
      "https://cdn.ecomm.ui.com/products/61d6b40e-0997-4ce0-b723-bb0c2c4aafa2/d99e9f7b-3488-4cf0-b8cf-1dd29b2425a5.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/61d6b40e-0997-4ce0-b723-bb0c2c4aafa2/d99e9f7b-3488-4cf0-b8cf-1dd29b2425a5.png",
      "https://cdn.ecomm.ui.com/products/61d6b40e-0997-4ce0-b723-bb0c2c4aafa2/c9ae2b3d-c30d-4bdc-9368-d6c39230b9a2.png",
      "https://cdn.ecomm.ui.com/products/61d6b40e-0997-4ce0-b723-bb0c2c4aafa2/50734fc2-32d7-40f0-9565-f0c7b07e92cc.png",
      "https://cdn.ecomm.ui.com/products/61d6b40e-0997-4ce0-b723-bb0c2c4aafa2/026a1bdd-8b57-46f0-bba0-8eddd9d8e036.png",
      "https://cdn.ecomm.ui.com/products/61d6b40e-0997-4ce0-b723-bb0c2c4aafa2/9000a662-c465-473a-a8e5-289c5ac22317.png",
      "https://cdn.ecomm.ui.com/products/61d6b40e-0997-4ce0-b723-bb0c2c4aafa2/034aa45b-4b35-4e6c-97ce-939177672c83.png",
      "https://cdn.ecomm.ui.com/products/61d6b40e-0997-4ce0-b723-bb0c2c4aafa2/7d5c0db0-1018-48ea-b005-c50abd336311.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:31.836881+00:00",
    created_at: "2025-02-19T00:35:58.635724+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "0707f2b7-72c8-4728-a31b-43476cddaa76",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Pro Max 48",
    model: "USW-Pro-Max-48",
    description: "A 48-port, Layer 3 Etherlighting™ switch with 2.5 GbE.",
    price: 649,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/products/usw-pro-max-48",
    image_url:
      "https://cdn.ecomm.ui.com/products/0966f626-63a9-4dc6-b07d-2e0b40e2cead/054f0d5c-16e6-4308-a567-9d8d443e884f.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/0966f626-63a9-4dc6-b07d-2e0b40e2cead/054f0d5c-16e6-4308-a567-9d8d443e884f.png",
      "https://cdn.ecomm.ui.com/products/0966f626-63a9-4dc6-b07d-2e0b40e2cead/ec39ba94-c2ac-4a64-8d15-11f59d70a63f.png",
      "https://cdn.ecomm.ui.com/products/0966f626-63a9-4dc6-b07d-2e0b40e2cead/9af5c00b-c70e-4c42-a053-776380d9ac1c.png",
      "https://cdn.ecomm.ui.com/products/0966f626-63a9-4dc6-b07d-2e0b40e2cead/6b86ff64-bddc-4d6d-86ca-823157955950.png",
      "https://cdn.ecomm.ui.com/products/0966f626-63a9-4dc6-b07d-2e0b40e2cead/5beeaed0-5682-4ca5-a3bf-c877c202c1d9.png",
      "https://cdn.ecomm.ui.com/products/0966f626-63a9-4dc6-b07d-2e0b40e2cead/c2f910f2-e0aa-4c29-92ab-800ccf5710f5.png",
      "https://cdn.ecomm.ui.com/products/0966f626-63a9-4dc6-b07d-2e0b40e2cead/94d4e153-f240-4280-a309-e7846ad90761.png",
      "https://cdn.ecomm.ui.com/products/0966f626-63a9-4dc6-b07d-2e0b40e2cead/4a529c17-aa22-4bcd-9747-c9894b5ef849.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:09.263752+00:00",
    created_at: "2025-02-19T00:35:58.726355+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "0afefc1b-e32a-4577-b168-2976546f8838",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "UniFi Express",
    model: "UX",
    description:
      "Impressively compact Cloud Gateway and WiFi 6 AP that runs UniFi Network. Powers an entire network or simply meshes as an AP.",
    price: 149,
    product_url:
      "https://store.ui.com/us/en/category/all-cloud-gateways/products/ux",
    image_url:
      "https://cdn.ecomm.ui.com/products/4ed25b4c-db92-4b98-bbf3-b0989f007c0e/a32c8b40-e814-4981-99a8-46fc575abba0.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/4ed25b4c-db92-4b98-bbf3-b0989f007c0e/a32c8b40-e814-4981-99a8-46fc575abba0.png",
      "https://cdn.ecomm.ui.com/products/4ed25b4c-db92-4b98-bbf3-b0989f007c0e/67e2dfef-da9e-4d88-8324-b9830c111698.png",
      "https://cdn.ecomm.ui.com/products/4ed25b4c-db92-4b98-bbf3-b0989f007c0e/ce9d8e10-f4e0-4453-8425-a8181db8fca7.png",
      "https://cdn.ecomm.ui.com/products/4ed25b4c-db92-4b98-bbf3-b0989f007c0e/ad85ef09-9005-42e7-a73d-b7d12a20753d.png",
      "https://cdn.ecomm.ui.com/products/4ed25b4c-db92-4b98-bbf3-b0989f007c0e/55f79c21-7089-4ff9-83d5-811ed88c7a5e.png",
      "https://cdn.ecomm.ui.com/products/4ed25b4c-db92-4b98-bbf3-b0989f007c0e/8ff040a0-4b16-4c98-a96c-b643cfafbc73.png",
      "https://cdn.ecomm.ui.com/products/4ed25b4c-db92-4b98-bbf3-b0989f007c0e/35089a3e-5059-494c-842a-b378e93f8789.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:12.692435+00:00",
    created_at: "2025-02-19T01:11:00.633929+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "5bac4a03-b4f8-448a-a5b8-b37bfd5a6036",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Dream Wall",
    model: "UDW (420W)",
    description:
      "Wall-mounted 10G Cloud Gateway with integrated WiFi 6, high-power PoE switching, and full UniFi application support.",
    price: 999,
    product_url:
      "https://store.ui.com/us/en/category/all-cloud-gateways/products/udw",
    image_url:
      "https://cdn.ecomm.ui.com/products/df8c3478-6280-45c0-80e3-78915f9c17c1/8707ef42-87b2-4725-b795-fb3ed27f227c.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/df8c3478-6280-45c0-80e3-78915f9c17c1/8707ef42-87b2-4725-b795-fb3ed27f227c.png",
      "https://cdn.ecomm.ui.com/products/df8c3478-6280-45c0-80e3-78915f9c17c1/b6fa08e7-c3c4-43e1-971d-e226558d9d4d.png",
      "https://cdn.ecomm.ui.com/products/df8c3478-6280-45c0-80e3-78915f9c17c1/44d71fb0-6309-47da-a5d7-2d59d961ea70.png",
      "https://cdn.ecomm.ui.com/products/df8c3478-6280-45c0-80e3-78915f9c17c1/f1405589-78cd-47ae-be09-918b4c352f70.png",
      "https://cdn.ecomm.ui.com/products/df8c3478-6280-45c0-80e3-78915f9c17c1/d62d1054-67a5-47bb-bf24-3fa0d347a4a7.png",
      "https://cdn.ecomm.ui.com/products/df8c3478-6280-45c0-80e3-78915f9c17c1/01f3c990-7080-44ef-b282-f0f1460e1b17.png",
      "https://cdn.ecomm.ui.com/products/df8c3478-6280-45c0-80e3-78915f9c17c1/655b5bd7-54ee-4c78-bfff-d1d7961af502.png",
      "https://cdn.ecomm.ui.com/products/df8c3478-6280-45c0-80e3-78915f9c17c1/f21afb66-3081-4a69-b8c2-4830bfc59118.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:14.592137+00:00",
    created_at: "2025-02-19T01:11:00.672815+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "8019a0a0-f6f1-4d85-b135-08195a45e773",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Enterprise Campus 48 PoE",
    model: "ECS-48-PoE (950W)",
    description:
      "Enterprise-grade 48-port, Layer 3 Etherlighting™ PoE+++ switch with high-capacity 10 GbE RJ45 and 25G SFP28 connections for high availability system design.",
    price: 3999,
    product_url:
      "https://store.ui.com/us/en/category/all-switching/collections/enterprise-campus-48/products/ecs-48-poe",
    image_url:
      "https://cdn.ecomm.ui.com/products/c0e18508-feb3-4d93-93d7-2a022815cfac/85c08f19-b66b-48e9-ac0f-d8d52e16966a.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/c0e18508-feb3-4d93-93d7-2a022815cfac/85c08f19-b66b-48e9-ac0f-d8d52e16966a.png",
      "https://cdn.ecomm.ui.com/products/c0e18508-feb3-4d93-93d7-2a022815cfac/743fec06-efb7-486e-a25d-ca373188606b.png",
      "https://cdn.ecomm.ui.com/products/c0e18508-feb3-4d93-93d7-2a022815cfac/4eeff7d3-2f1c-4fd2-9743-e792b56e988b.png",
      "https://cdn.ecomm.ui.com/products/c0e18508-feb3-4d93-93d7-2a022815cfac/13dd033e-7cb4-4f1a-a98f-f3470cf2da45.png",
      "https://cdn.ecomm.ui.com/products/c0e18508-feb3-4d93-93d7-2a022815cfac/dc7d8e6d-66e6-45f9-87f3-e415a0be89a3.png",
    ],
    availability: "Out of Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:25.405853+00:00",
    created_at: "2025-02-19T00:35:59.12532+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
  {
    id: "b70f1aa8-0a89-467b-9e13-53afdee010d3",
    vendor_id: "02610d22-84f0-4bed-9c0e-40784883aefc",
    name: "Dream Machine Pro",
    model: "UDM-Pro",
    description:
      "10G Cloud Gateway with 100+ UniFi device / 1,000+ client support and 3.5 Gbps IPS routing.",
    price: 379,
    product_url:
      "https://store.ui.com/us/en/category/all-cloud-gateways/products/udm-pro",
    image_url:
      "https://cdn.ecomm.ui.com/products/9df27ed4-c4ae-471a-8982-f5b0650da76a/7997cc11-b8c5-48e0-8b7e-bed4ded30898.png",
    image_urls: [
      "https://cdn.ecomm.ui.com/products/9df27ed4-c4ae-471a-8982-f5b0650da76a/7997cc11-b8c5-48e0-8b7e-bed4ded30898.png",
      "https://cdn.ecomm.ui.com/products/9df27ed4-c4ae-471a-8982-f5b0650da76a/7109a335-609b-4663-976b-e76dd142c23c.png",
      "https://cdn.ecomm.ui.com/products/9df27ed4-c4ae-471a-8982-f5b0650da76a/fe5c4a84-1ef6-43fe-aaec-5c74245aeedc.png",
      "https://cdn.ecomm.ui.com/products/9df27ed4-c4ae-471a-8982-f5b0650da76a/d9511b02-b4bd-46ff-976f-e7bbccf99ae8.png",
      "https://cdn.ecomm.ui.com/products/9df27ed4-c4ae-471a-8982-f5b0650da76a/92f10a46-bafb-48eb-9775-1aa48aeb972f.png",
      "https://cdn.ecomm.ui.com/products/9df27ed4-c4ae-471a-8982-f5b0650da76a/8cce64ff-1c84-40c4-8fbf-dc3180391740.png",
      "https://cdn.ecomm.ui.com/products/9df27ed4-c4ae-471a-8982-f5b0650da76a/45abf6a4-c44f-4e50-9081-977b006545e2.png",
    ],
    availability: "In Stock",
    specs: {},
    last_updated: "2025-02-19T01:49:39.010946+00:00",
    created_at: "2025-02-19T01:11:00.476175+00:00",
    category_id: "9233d6a5-4cd4-4667-9793-dd7e589585a6",
    specs_image_url: null,
  },
];

const recent = [
  products[5],
  products[4],
  products[2],
  products[10],
  products[16],
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AddProduct({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const handleManualAddProduct = () => {
    setOpen(false);
    router.push(
      pathname + "?" + createQueryString("addProductManually", "true")
    );
  };
  const filteredPeople =
    query === ""
      ? []
      : products.filter((product) => {
          return product.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Dialog
      className="relative z-50"
      as="div"
      open={open}
      onClose={() => {
        setOpen(false);
        setQuery("");
      }}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 z-10 bg-gray-500/25 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
        <DialogPanel
          transition
          className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <Combobox as="div">
            {({ activeOption }) => (
              <>
                <div className="grid grid-cols-1">
                  <ComboboxInput
                    autoFocus
                    className="col-start-1 row-start-1 h-12 w-full pl-11 pr-4 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm"
                    placeholder="Start typing to search..."
                    onChange={(event) => setQuery(event.target.value)}
                    onBlur={() => setQuery("")}
                  />
                  <MagnifyingGlassIcon
                    className="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-400"
                    aria-hidden="true"
                  />
                </div>

                {(query === "" || filteredPeople.length > 0) && (
                  <ComboboxOptions
                    as="div"
                    static
                    hold
                    className="flex transform-gpu divide-x divide-gray-100"
                  >
                    <div
                      className={classNames(
                        "max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4",
                        (activeOption as Product) ? "sm:h-96" : ""
                      )}
                    >
                      {query === "" && (
                        <h2 className="mb-4 mt-2 text-xs font-semibold text-gray-500">
                          Recent searches
                        </h2>
                      )}
                      <div className="-mx-2 text-sm text-gray-700">
                        {(query === "" ? recent : filteredPeople).map(
                          (product) => (
                            <ComboboxOption
                              as="div"
                              key={product.id}
                              value={product}
                              className="group flex cursor-default select-none items-center rounded-md p-2 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            >
                              <img
                                src={product.image_url}
                                alt=""
                                className="size-6 flex-none rounded-full"
                              />
                              <span className="ml-3 flex-auto truncate">
                                {product.name}
                              </span>
                              <ChevronRightIcon
                                className="ml-3 hidden size-5 flex-none text-gray-400 group-data-[focus]:block"
                                aria-hidden="true"
                              />
                            </ComboboxOption>
                          )
                        )}
                      </div>
                    </div>

                    {(activeOption as Product) ? (
                      <>
                        <div className="hidden w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                          <div className="flex-none p-6 text-center">
                            <img
                              src={(activeOption as Product).image_url}
                              alt={(activeOption as Product).name}
                              className="mx-auto h-48 w-auto"
                            />
                            <h2 className="mt-3 font-semibold text-gray-900">
                              {(activeOption as Product).name}
                            </h2>
                            <p className="text-sm/6 text-gray-500">
                              {(activeOption as Product).model}
                            </p>
                          </div>
                          <div className="flex flex-auto flex-col justify-between p-6">
                            <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                              <dt className="col-end-1 font-semibold text-gray-900">
                                Manufacturer
                              </dt>
                              <dd className="truncate">
                                {(activeOption as Product).vendor_id}
                              </dd>
                              <dt className="col-end-1 font-semibold text-gray-900">
                                Price
                              </dt>
                              <dd>
                                {formatPrice((activeOption as Product).price)}
                              </dd>
                              <dt className="col-end-1 font-semibold text-gray-900">
                                URL
                              </dt>
                              <dd className="truncate">
                                <a
                                  href={(activeOption as Product).product_url}
                                  className="text-indigo-600 underline"
                                >
                                  {(activeOption as Product).product_url}
                                </a>
                              </dd>
                              <dt className="col-end-1 font-semibold text-gray-900">
                                Availability
                              </dt>
                              <dd className="truncate">
                                {(activeOption as Product).availability}
                              </dd>
                            </dl>
                            <button
                              type="button"
                              className="mt-6 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Add product
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="px-6 py-14 text-center text-sm sm:px-14">
                        <UsersIcon
                          className="mx-auto size-6 text-gray-400"
                          aria-hidden="true"
                        />
                        <p className="mt-4 font-semibold text-gray-900">
                          Start typing to search ...
                        </p>
                        <p className="mt-2 text-gray-500">
                          You can search our database or add the product
                          manually.
                        </p>
                        <button
                          type="button"
                          onClick={handleManualAddProduct}
                          className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Add product manually
                        </button>
                      </div>
                    )}
                  </ComboboxOptions>
                )}

                {query !== "" && filteredPeople.length === 0 && (
                  <div className="px-6 py-14 text-center text-sm sm:px-14">
                    <UsersIcon
                      className="mx-auto size-6 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="mt-4 font-semibold text-gray-900">
                      No products foundsss
                    </p>
                    <p className="mt-2 text-gray-500">
                      We couldn’t find anything with that term. Please try
                      again. or add the product manually.
                    </p>
                    <button
                      type="button"
                      className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => alert("test")}
                    >
                      Add product manually
                    </button>
                  </div>
                )}
              </>
            )}
          </Combobox>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
