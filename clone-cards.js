#!/usr/bin/env node

const axios = require('axios');
const Promise = require('bluebird');

const DOMAIN = '';
const API_KEY = '';

const CARD_IDS = [1,2,3,4,5];
const TARGET_BOARD_ID = 1;


const axiosInstance = axios.create({
  baseURL: `https://${DOMAIN}.kaiten.io/api/v1`,
  headers: {'Authorization': `Bearer ${API_KEY}`},
});

async function cloneCards () {
  await Promise.each(CARD_IDS, async id => {
    try {
      const {data: card} = await axiosInstance.get(`cards/${id}`);

      const { data, status } = await axiosInstance.post('cards', {
        clone_card_id: id,
        title: card.title,
        board_id: TARGET_BOARD_ID,
        // flags
        copy_description: true,
        copy_business_value: true,
        copy_tags: true,
        copy_links: true,
        copy_files: true,
        copy_due_date: true,
        create_relation: false
      });

      console.log(`Clone card ${id}, success!`)
    } catch (e) {
      console.log(`Clone card ${id}, error :(`);
      console.error(e);
    }
  });
}

cloneCards().then(() => {
  console.log('Done!');
  process.exit(0)
}).catch(e => {
  console.error(e);
  procexx.exit(13);
});
