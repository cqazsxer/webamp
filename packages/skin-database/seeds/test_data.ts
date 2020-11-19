import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  await knex("skins").del();
  await knex("files").del();
  await knex("skin_reviews").del();
  // Inserts seed entries
  await knex("skins").insert([
    { md5: "a_fake_md5", skin_type: 1 },
    { md5: "a_modern_skin_md5", skin_type: 2 },
    { md5: "an_approved_md5", skin_type: 1 },
    { md5: "a_rejected_md5", skin_type: 1 },
    { md5: "a_nsfw_md5", skin_type: 1 },
  ]);
  await knex("files").insert([
    { skin_md5: "a_fake_md5", file_path: "/a/fake/path.wsz" },
    { skin_md5: "a_modern_skin_md5", file_path: "/a/fake/modern_skin.wal" },
    { skin_md5: "an_approved_md5", file_path: "/a/fake/approved.wsz" },
    { skin_md5: "a_rejected_md5", file_path: "/a/fake/rejected.wsz" },
    { skin_md5: "a_nsfw_md5", file_path: "/a/fake/nsfw.wsz" },
  ]);
  await knex("skin_reviews").insert([
    { skin_md5: "an_approved_md5", review: "APPROVED" },
    { skin_md5: "a_rejected_md5", review: "REJECTED" },
    { skin_md5: "a_nsfw_md5", review: "NSFW" },
  ]);
}