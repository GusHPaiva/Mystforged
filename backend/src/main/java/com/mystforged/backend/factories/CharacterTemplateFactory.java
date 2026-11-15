package com.mystforged.backend.factories;


import com.mystforged.backend.dtos.CharacterCreateDTO;
import com.mystforged.backend.models.Character;
import com.mystforged.backend.models.User;
import com.mystforged.backend.models.json.*;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component

public class CharacterTemplateFactory {
    public Character buildInitialCharacter(CharacterCreateDTO data, User userData){

        StatusData statusData = buildStatusData();
        Character newcharacter = Character.builder()
                .name(data.name())
                .image_url(data.image_url())
                .user(userData)
                .status(statusData)
                .progression(buildProgressionData())
                .sequence(buildSequenceData())
                .traits(buildTraitsData())
                .conditions(buildConditionsData())
                .inventory(buildInventoryData())
                .bio(buildBioData())
                .build();
        return newcharacter;
    }
    private BioData buildBioData(){
        BioData bio = BioData.builder()
                .build();
        return bio;
    }
    private SequenceData buildSequenceData(){
        SequenceData sequence = SequenceData.builder()
                .rp(0)
                .build();
        return sequence;
    }
    private TraitsData buildTraitsData(){
        TraitsData traits = TraitsData.builder()
                .build();
        return traits;
    }
    private ConditionsData buildConditionsData(){
        ConditionsData conditions = ConditionsData.builder()
                .build();
        return conditions;
    }
    private InventoryData buildInventoryData(){
        InventoryData inventory = InventoryData.builder()
                .money(0)
                .build();
        return inventory;
    }
    private StatusData buildStatusData(){
        StatusData statusData = StatusData.builder()
                .currentHP(10)
                .currentEs(3)
                .maxPdc(5)
                .guard(10)
                .lt(5)
                .movement(6)
                .build();
        return  statusData;
    }
    private ProgressionData buildProgressionData(){


        ProgressionData progressionData = ProgressionData.builder()
                .attributes(buildAttributes())
                .build();
        return  progressionData;
    }
    private  Map<String, ProgressionData.Attribute> buildAttributes(){
        Map<String, ProgressionData.Attribute> startingAttributes = new HashMap<>();
        startingAttributes.put("CON", buildCON());
        startingAttributes.put("AGI", buildAGI());
        startingAttributes.put("INT", buildINT());
        startingAttributes.put("MEN", buildMEN());
        startingAttributes.put("CHA", buildCHA());
        startingAttributes.put("AMA", buildAMA());

        return startingAttributes;
    }
    private ProgressionData.Attribute buildCON(){
        Map<String, ProgressionData.Skill> conskills = new HashMap<>();
        conskills.put("Athletics", ProgressionData.Skill.builder()
                .name("Athletics")
                .level(1)
                .currentPt(0)
                .build());

        conskills.put("Strength", ProgressionData.Skill.builder()
                .name("Strength")
                .level(1)
                .currentPt(0)
                .build());
        conskills.put("Fortitude", ProgressionData.Skill.builder()
                .name("Fortitude")
                .level(1)
                .currentPt(0)
                .build());
        conskills.put("Combat", ProgressionData.Skill.builder()
                .name("Combat")
                .level(1)
                .currentPt(0)
                .build());

         ProgressionData.Attribute CON = ProgressionData.Attribute.builder()
                .name("CON")
                .level(1)
                .currentXp(0)
                .currentPt(0)
                .skills(conskills)
                .build();

        return CON;
    }
    private ProgressionData.Attribute buildAGI(){
        Map<String, ProgressionData.Skill> agiskills = new HashMap<>();
        agiskills.put("Dexterity", ProgressionData.Skill.builder()
                .name("Dexterity")
                .level(1)
                .currentPt(0)
                .build());

        agiskills.put("Acrobatics", ProgressionData.Skill.builder()
                .name("Acrobatics")
                .level(1)
                .currentPt(0)
                .build());
        agiskills.put("Accuracy", ProgressionData.Skill.builder()
                .name("Accuracy")
                .level(1)
                .currentPt(0)
                .build());
        agiskills.put("Reflexes", ProgressionData.Skill.builder()
                .name("Reflexes")
                .level(1)
                .currentPt(0)
                .build());
        agiskills.put("Stealth", ProgressionData.Skill.builder()
                .name("Stealth")
                .level(1)
                .currentPt(0)
                .build());
        agiskills.put("Agile Combat", ProgressionData.Skill.builder()
                .name("Agile Combat")
                .level(1)
                .currentPt(0)
                .build());

        ProgressionData.Attribute AGI = ProgressionData.Attribute.builder()
                .name("AGI")
                .level(1)
                .currentXp(0)
                .currentPt(0)
                .skills(agiskills)
                .build();

        return AGI;
    }
    private ProgressionData.Attribute buildINT(){
        Map<String, ProgressionData.Skill> intskills = new HashMap<>();
        intskills.put("Investigation", ProgressionData.Skill.builder()
                .name("Investigation")
                .level(1)
                .currentPt(0)
                .build());

        intskills.put("Knowledge", ProgressionData.Skill.builder()
                .name("Knowledge")
                .level(1)
                .currentPt(0)
                .build());
        intskills.put("Expertise", ProgressionData.Skill.builder()
                .name("Expertise")
                .level(1)
                .currentPt(0)
                .build());
        intskills.put("Survival", ProgressionData.Skill.builder()
                .name("Survival")
                .level(1)
                .currentPt(0)
                .build());


        ProgressionData.Attribute INT = ProgressionData.Attribute.builder()
                .name("INT")
                .level(1)
                .currentXp(0)
                .currentPt(0)
                .skills(intskills)
                .build();

        return INT;
    }
    private ProgressionData.Attribute buildMEN(){
        Map<String, ProgressionData.Skill> menskills = new HashMap<>();
        menskills.put("Sanity", ProgressionData.Skill.builder()
                .name("Sanity")
                .level(1)
                .currentPt(0)
                .build());

        menskills.put("Will", ProgressionData.Skill.builder()
                .name("Will")
                .level(1)
                .currentPt(0)
                .build());
        menskills.put("Perception", ProgressionData.Skill.builder()
                .name("Perception")
                .level(1)
                .currentPt(0)
                .build());
        menskills.put("Meditation", ProgressionData.Skill.builder()
                .name("Meditation")
                .level(1)
                .currentPt(0)
                .build());
        menskills.put("Focus", ProgressionData.Skill.builder()
                .name("Focus")
                .level(1)
                .currentPt(0)
                .build());

        ProgressionData.Attribute MEN = ProgressionData.Attribute.builder()
                .name("MEN")
                .level(1)
                .currentXp(0)
                .currentPt(0)
                .skills(menskills)
                .build();

        return MEN;
    }
    private ProgressionData.Attribute buildCHA(){
        Map<String, ProgressionData.Skill> chaskills = new HashMap<>();
        chaskills.put("Diplomacy", ProgressionData.Skill.builder()
                .name("Diplomacy")
                .level(1)
                .currentPt(0)
                .build());

        chaskills.put("Deception", ProgressionData.Skill.builder()
                .name("Deception")
                .level(1)
                .currentPt(0)
                .build());
        chaskills.put("Dominance", ProgressionData.Skill.builder()
                .name("Dominance")
                .level(1)
                .currentPt(0)
                .build());
        chaskills.put("Leadership", ProgressionData.Skill.builder()
                .name("Leadership")
                .level(1)
                .currentPt(0)
                .build());


        ProgressionData.Attribute CHA = ProgressionData.Attribute.builder()
                .name("CHA")
                .level(1)
                .currentXp(0)
                .currentPt(0)
                .skills(chaskills)
                .build();
        return CHA;
    }
    private ProgressionData.Attribute buildAMA(){
        Map<String, ProgressionData.Skill> amaskills = new HashMap<>();
        amaskills.put("Spiritual Perception", ProgressionData.Skill.builder()
                .name("Spiritual Perception")
                .level(1)
                .currentPt(0)
                .build());

        amaskills.put("Spiritual Control", ProgressionData.Skill.builder()
                .name("Spiritual Control")
                .level(1)
                .currentPt(0)
                .build());

        ProgressionData.Attribute AMA = ProgressionData.Attribute.builder()
                .name("AMA")
                .level(1)
                .currentXp(0)
                .currentPt(0)
                .skills(amaskills)
                .build();
        return AMA;
    }
}
